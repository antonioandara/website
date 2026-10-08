const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const sourceRoot=path.resolve(__dirname,'..');
const root=process.env.SITE_ROOT ? path.resolve(process.env.SITE_ROOT) : sourceRoot;
const server=http.createServer((q,r)=>{
 const pathname=new URL(q.url,'http://localhost').pathname;
 const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){r.writeHead(404);r.end();return;}
 const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
 r.setHeader('Content-Type',mime[path.extname(file)]||'text/plain');fs.createReadStream(file).pipe(r);
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const base='http://127.0.0.1:'+server.address().port;
  // Theme ports can update the document before Elm renders the switch.
  async function assertThemeSwitch(expected){
   await page.waitForFunction(value=>document.querySelector('[role=switch]')?.getAttribute('aria-checked')===value,expected);
   assert.equal(await page.getByRole('switch',{name:'Light mode'}).getAttribute('aria-checked'),expected);
  }
  await page.goto(base+'/index.html#lms');
  assert.equal(await page.locator('#lms').count(),1);
  assert.equal(await page.locator('#lms .text-links a').count(),1);
  assert.equal(await page.locator('a.lms-project-preview').getAttribute('href'),'projects/lms/demo/index.html');
  assert.equal(await page.locator('#magic a[href="https://www.youtube.com/@viamagus"]').count(),1);
  const previewImage=page.locator('.lms-project-preview img');
  // Lazy images start loading when scrolled into view, after navigation finishes.
  await previewImage.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>{
   const image=document.querySelector('.lms-project-preview img');
   return image?.complete&&image.naturalWidth>0;
  });
  assert.ok(await previewImage.evaluate(i=>i.complete&&i.naturalWidth>0));
  await page.locator('#lms').getByRole('link',{name:'Try a sample lesson ↗',exact:true}).click();
  assert.equal(new URL(page.url()).pathname,'/projects/lms/demo/index.html');
  await page.getByRole('switch',{name:'Light mode'}).waitFor();
  await assertThemeSwitch('false');
  assert.equal(await page.getByText('Theme studio',{exact:true}).count(),0);
  assert.equal(await page.getByText('Lesson styles',{exact:true}).count(),0);
  assert.equal(await page.locator('.course-sidebar').getByRole('button').count(),2);
  await page.evaluate(() => document.fonts.ready);
  if(process.env.REFRESH_LMS_PREVIEW === '1') await page.screenshot({path:path.join(root,'projects/lms/preview.png')});
  await page.getByLabel('A decimal',{exact:true}).fill('13');
  await page.getByLabel('B decimal',{exact:true}).fill('3');
  await page.getByText('Decimal 15',{exact:true}).waitFor();
  await page.getByRole('radio',{name:'AND',exact:true}).click();
  await page.getByText('Decimal 1',{exact:true}).waitFor();
  // Bit 128 changes A's numeric value, proving buttons are rendered and wired.
  await page.getByRole('button',{name:/^128\s+0$/}).first().click();
  await page.waitForFunction(()=>[...document.querySelectorAll('input')].some(i=>i.value==='141'));
  await page.getByText('10',{exact:true}).click();
  await page.getByRole('button',{name:'Submit',exact:true}).first().click();
  await page.getByText('Exactly. The set bits contribute 8 and 2.',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Mark lesson complete',exact:true}).click();
  await page.getByText('1 / 2 complete',{exact:true}).waitFor();
  const chapters=page.locator('.course-sidebar');
  await chapters.getByRole('button',{name:'From bits to decisions',exact:true}).click();
  await page.getByLabel('Boolean expression',{exact:true}).fill('AB');
  await page.waitForFunction(()=>document.querySelector('[role=table]')?.innerText.replace(/\s+/g,' ').trim()==='A B Y 0 0 0 0 1 0 1 0 0 1 1 1');
  const text=await page.locator('.lesson-reader').innerText();
  assert.ok(text.includes('Truth Table Generator'));
  await page.screenshot({path:'/tmp/lms-logic.png'});
  const themeSwitch=page.getByRole('switch',{name:'Light mode'});
  await themeSwitch.click();
  await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
  await assertThemeSwitch('true');
  assert.equal(await page.evaluate(()=>localStorage.getItem('manual-theme')),'light');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(251, 250, 244)');
  await page.reload();
  await assertThemeSwitch('true');
  await page.getByRole('link',{name:'← Antonio Andara',exact:true}).click();
  await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');
  await page.locator('.reading-header .theme-toggle').click();
  await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
  await page.goto(base+'/projects/lms/demo/index.html');
  await assertThemeSwitch('false');
  // Existing full-app preferences must not restore the removed settings.
  await page.evaluate(()=>localStorage.setItem('antonio:lms-preview:preferences:v1',JSON.stringify({theme:{baseTheme:'botanical'},activeSlug:'a-book-you-can-build-on'})));
  await page.reload();
  await assertThemeSwitch('false');
  await page.getByLabel('A decimal',{exact:true}).waitFor();
  for(const width of [390,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const route of ['/index.html#lms','/projects/lms/demo/index.html']){
    await page.goto(base+route);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);
   }
   if(width===390){
    await page.getByRole('switch',{name:'Light mode'}).click();
    await page.waitForFunction(()=>document.querySelector('[role=switch]').getAttribute('aria-checked')==='true');
    await page.getByRole('switch',{name:'Light mode'}).click();
    await page.waitForFunction(()=>document.querySelector('[role=switch]').getAttribute('aria-checked')==='false');
    await page.getByRole('button',{name:'Show sidebar',exact:true}).click();
    await page.locator('.course-sidebar').getByRole('button',{name:'Thinking in bits',exact:true}).click();
    await page.getByRole('button',{name:'Hide sidebar',exact:true}).click();
    await page.getByLabel('A decimal',{exact:true}).fill('5');
    assert.equal(await page.getByLabel('A decimal',{exact:true}).inputValue(),'5');
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: short two-lesson preview, no settings studios, binary controls, quiz, completion, truth table, shared dark/light theme and responsive views.');
 }catch(e){await browser.contexts()[0]?.pages()[0]?.screenshot({path:'/tmp/lms-test-failure.png'});throw e;}finally{await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
