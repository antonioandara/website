const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1100}, reducedMotion:'reduce'});
    const errors = [];page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/illustration-lab/`);
    await page.evaluate(() => document.fonts.ready);
    const settle = () => page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const select = async name => {await page.getByRole('button', {name, exact:false}).click();await settle();};
    const slider = async (name, value) => {await page.getByRole('slider',{name,exact:true}).evaluate((el, n) => {el.value=n;el.dispatchEvent(new Event('input',{bubbles:true}));}, String(value));await settle();};
    const curve = () => page.locator('#bezier-svg path.curve').getAttribute('d');
    const original = await curve();
    await slider('First handle · x', 200);
    assert.notEqual(await curve(), original);
    await select('Reset');assert.equal(await curve(), original);
    const handle = page.locator('[data-handle="1"]');
    const box = await handle.boundingBox();
    await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+90,box.y+75,{steps:8});await page.mouse.up();
    assert.notEqual(await curve(),original,'Dragging changes actual curve');
    await select('Reset');
    await slider('Progress t',0);
    const marker=page.locator('#bezier-svg .marker');
    assert.equal(await marker.getAttribute('cx'),'40');assert.equal(await marker.getAttribute('cy'),'200');
    await slider('Progress t',1);
    assert.equal(await marker.getAttribute('cx'),'320');assert.equal(await marker.getAttribute('cy'),'60');
    await select('Play');
    await page.waitForFunction(()=>document.querySelector('[aria-label="Progress t"]').value !== '1');
    await select('Pause');
    await page.getByRole('button',{name:'Play',exact:true}).waitFor();
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const paused=await marker.getAttribute('cx');await page.waitForTimeout(100);assert.equal(await marker.getAttribute('cx'),paused);
    await page.screenshot({path:'/tmp/illustration-lab-desktop.png',fullPage:true});
    await select('Signal bench');await slider('Amplitude',0);
    const points=await page.locator('polyline.curve').getAttribute('points');assert.ok(points.split(' ').every(p=>p.endsWith(',130')));
    await slider('Amplitude',65);
    const wave=await page.locator('polyline.curve').getAttribute('points');await select('Play');
    await page.waitForFunction(old=>document.querySelector('polyline.curve').getAttribute('points')!==old,wave);await select('Pause');
    await select('Recursive patterns');await slider('Recursion depth',5);assert.equal(await page.locator('.fractal-cell').count(),243);
    await slider('Recursion depth',0);assert.equal(await page.locator('.fractal-cell').count(),1);
    await select('Cellular rules');await slider('Rule number',0);assert.equal(await page.locator('.life-cell').count(),1);
    await page.getByRole('button',{name:'90',exact:true}).click();await settle();assert.ok(await page.locator('.life-cell').count()>1);
    await select('Light theme');await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
    const downloadPromise=page.waitForEvent('download');await select('Save SVG');const download=await downloadPromise;
    const content=fs.readFileSync(await download.path(),'utf8');assert.ok(content.includes('http://www.w3.org/2000/svg'));assert.ok(content.includes('rgb('));assert.ok(!content.includes('var(--'));
    await select('Three-color map');await select('Reset');
    assert.match(await page.locator('.canvas-foot').innerText(), /^0 conflicting/);
    assert.equal(await page.locator('.region').count(),12);
    await select('Cycle color');assert.match(await page.locator('.canvas-foot').innerText(), /^[1-9]/);
    await select('Show graph');assert.equal(await page.locator('circle.region').count(),12);
    assert.ok(await page.locator('.conflict').count()>0);
    await select('Reset');assert.match(await page.locator('.canvas-foot').innerText(), /^0 conflicting/);
    await page.screenshot({path:'/tmp/lab-map.png',fullPage:true});
    await select('Multiplexer');await select('Reset');
    for(let address=0;address<4;address++) {
      await slider('Select address',address);
      assert.match(await page.locator('.canvas-foot').innerText(),new RegExp('Y = D'+address+' = '+[1,0,1,0][address]));
    }
    await page.getByRole('button',{name:'D3 = 0',exact:true}).click();await settle();
    assert.match(await page.locator('.canvas-foot').innerText(),/Y = D3 = 1/);
    await select('Clocked datapath');await select('Reset');await slider('Operand B',15);
    assert.match(await page.locator('.canvas-foot').innerText(),/Q = 0 \/ next D = 15/);
    await select('Clock ↑');await select('Clock ↑');assert.match(await page.locator('.canvas-foot').innerText(),/Q = 14 \/ next D = 13/);
    await select('Operation: ADD');await select('Clock ↑');assert.match(await page.locator('.canvas-foot').innerText(),/Q = 1 \/ next D = 14/);
    await select('Systolic array');await select('Reset');
    const sums=()=>page.locator('.sum').allTextContents();
    assert.deepEqual(await sums(),Array(9).fill('0'));
    await select('Step clock');assert.deepEqual(await sums(),['1','0','0','0','0','0','0','0','0']);
    for(let i=1;i<7;i++) await select('Step clock');
    assert.deepEqual(await sums(),['7','2','5','16','5','14','25','8','23']);
    assert.equal(await page.getByRole('button',{name:'Step clock →',exact:true}).isDisabled(),true);
    await select('Back');assert.equal((await sums())[8],'14');
    await page.screenshot({path:'/tmp/lab-systolic.png',fullPage:true});
    await select('FPGA fabric');await select('Reset');
    assert.match(await page.locator('.canvas-foot').innerText(),/Y = 0/);
    await select('LUT: AND');assert.match(await page.locator('.canvas-foot').innerText(),/Y = 1/);
    const route=await page.locator('.live-wire').first().getAttribute('d');
    await select('Use lower route');assert.notEqual(await page.locator('.live-wire').first().getAttribute('d'),route);
    assert.match(await page.locator('.canvas-foot').innerText(),/Y = 1/);
    await select('Dark theme');
    for (const [name,file] of [['Three-color map','map'],['Multiplexer','mux'],['Clocked datapath','datapath'],['Systolic array','systolic'],['FPGA fabric','fabric']]) {
      await select(name);
      await page.locator('.bench').screenshot({path:'/tmp/lines-'+file+'.png'});
    }
    for (const width of [320,390,768,1440]) {
      await page.setViewportSize({width,height:900});
      for (const name of ['Bézier curves','Signal bench','Recursive patterns','Cellular rules','Three-color map','Multiplexer','Clocked datapath','Systolic array','FPGA fabric']) {
        await select(name);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name}: overflow at ${width}`);
      }
    }
    await page.setViewportSize({width:390,height:844});await select('Bézier curves');
    await page.screenshot({path:'/tmp/illustration-lab-mobile.png',fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('PASS: curve dragging/sliders/endpoints, playback/pause, signal geometry, fractal counts, cellular rules, theme, standalone SVG export, nine experiments at four widths, map conflicts, mux selection, register arithmetic, matrix multiplication, FPGA routing, no runtime errors.');
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
