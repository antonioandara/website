const assert = require('node:assert/strict');
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const sourceRoot = path.resolve(__dirname, '..');
const root = process.env.SITE_ROOT ? path.resolve(process.env.SITE_ROOT) : sourceRoot;
execFileSync(path.join(sourceRoot, 'node_modules/.bin/elm'), ['make', 'checks/CheckConstraint.elm', '--optimize', '--output=/tmp/antonio-constraint-checks.js'], { cwd: path.join(sourceRoot, 'experiments'), stdio: 'inherit' });
const models = new Promise(resolve => require('/tmp/antonio-constraint-checks.js').Elm.CheckConstraint.init().ports.report.subscribe(resolve));

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html');
  fs.createReadStream(file).pipe(res);
});
(async () => {
  const results = await models;
  for (const example of results) {
    assert.ok(example.rows.every(r => r.solved && r.forced && r.outputUnpinned), example.name+' must force OUT without fixing it');
    assert.ok(example.transitions.every(Boolean), example.name+' must settle correctly using causal local repairs');
    assert.ok(example.inputToggles.every(Boolean), example.name+' must settle every input toggle and interrupted repair');
    assert.ok(Math.abs(example.coverage - 1) < 1e-10, example.name+" must fill the whole frame");
    assert.ok(example.cachedDefaultMatches, "precomputed default must match generated outlines and constraints");
    assert.ok(example.connectionsValid,example.name+" must preserve the logic graph through actual shared borders");
  }
  console.log('PASS: 152 truth-table rows, unpinned outputs, actual border topology and causal propagation.');
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } }), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const base = 'http://127.0.0.1:' + server.address().port;
    await page.route('**/three-color-mosaic.js', route => route.fulfill({
      contentType: 'text/javascript',
      body: "performance.mark('map-start');\n" + fs.readFileSync(path.join(root,'experiments/three-color-mosaic.js'),'utf8') + "\nperformance.mark('map-end');performance.measure('map-startup','map-start','map-end');"
    }));
    const frame = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const settle = async () => { await frame(); await page.waitForFunction(() => !document.querySelector('.mosaic-map[data-propagating="true"]'), {}, { timeout: 30000 }); };
    const click = async name => { await page.getByRole('button', { name, exact: true }).click(); await settle(); };
    const snapshot = view => view.locator('.mosaic-cell').evaluateAll(ns => ns.map(n => ({
      id: +n.dataset.region, label: n.getAttribute('aria-label'), neighbors: n.dataset.neighbors,
      color: +n.dataset.color, fill: n.querySelector('path').getAttribute('fill'), d: n.querySelector('path').getAttribute('d')
    })));
    const checkGeometry = async view => {
      const result = await view.locator('svg.mosaic-surface').evaluate(svg => {
        const paths = [...svg.querySelectorAll('.mosaic-cell > path')].map(path => ({path, box:path.getBBox()}));
        const bounds = svg.viewBox.baseVal;
        const step = Math.max(1, Math.sqrt(bounds.width*bounds.height/18000));
        const point = new DOMPoint();
        let overlaps = 0, gaps = 0;
        for(let y=0.37;y<bounds.height-24;y+=step) for(let x=0.31;x<bounds.width-24;x+=step) {
          point.x=x; point.y=y;
          let count=0, filled=0;
          for(const {path,box} of paths) {
            if(x<box.x || x>box.x+box.width || y<box.y || y>box.y+box.height) continue;
            if(path.isPointInFill(point)) { filled++; if(!path.isPointInStroke(point)) count++; }
          }
          if(count>1) overlaps++;
          if(filled===0) gaps++;
        }
        const escapedLabels = [...svg.querySelectorAll('.mosaic-cell text')].filter(label => {
          const p = new DOMPoint(+label.getAttribute('x'),+label.getAttribute('y'));
          return !label.parentNode.querySelector('path').isPointInFill(p);
        }).length;
        return {overlaps, gaps, escapedLabels, curves:paths.every(({path,box}) => box.width < 8 || box.height < 8 || path.getAttribute('d').includes(' Q '))};
      });
      assert.equal(result.gaps,0,'curved cells must fill the entire frame');
      assert.equal(result.overlaps,0,'smooth cells must not overlap away from their shared outlines');
      assert.equal(result.escapedLabels,0,'labels must stay inside their smoothed cell');
      assert.ok(result.curves,'cells must render curved contours');
    };
    for (const file of ['three-color-mosaic.html']) {
      await page.goto(base + '/experiments/' + file);
      const tiles = page.locator('.mosaic-map[data-view="organic"]').first();
      const startup = await page.evaluate(() => performance.getEntriesByName('map-startup')[0].duration);
      assert.ok(startup < 2000, `default map must avoid expensive startup generation (${startup} ms)`);
      for (const name of results.slice(0,12).map(e => e.name)) {
        await click(name);
        assert.equal(await page.getByRole('alert').count(), 0);
        await checkGeometry(tiles);
        const cells = await snapshot(tiles);
        assert.ok(cells.every(c => ['#397d68','#426f9f','#bb5961'].includes(c.fill)));
        for(const cell of cells) for(const neighbor of cell.neighbors.split(',').filter(Boolean).map(Number)) assert.notEqual(cell.fill,cells[neighbor].fill,name+' must be a proper three-color map');


      }
      assert.equal(await page.locator('.signal-link').count(), 0);
      await click('Multiplexer');
      const before = await snapshot(tiles);
      const priorOutput = before.find(c=>c.label.startsWith('OUT=')).label;
      await page.getByRole('checkbox', {name:'Animate coloring'}).uncheck();
      await page.getByRole('button', {name:'Toggle a',exact:true}).click(); await frame();
      assert.equal(await tiles.getAttribute('data-propagating'), 'true');
      assert.equal((await snapshot(tiles)).find(c=>c.label.startsWith('OUT=')).label, priorOutput, 'OUT must wait for the signal');
      const firstWave = await snapshot(tiles);
      assert.ok(firstWave.filter((c,i)=>c.fill!==before[i].fill).every(c=>c.label.startsWith('a=')), 'first frame changes only the toggled input regions');
      let sawColorChanges = false;
      for (let i=0; i<1000 && !(await page.getByRole('button',{name:'Step propagation',exact:true}).isDisabled()); i++) {
        await page.getByRole('button',{name:'Step propagation',exact:true}).click(); await frame();
        const current=await snapshot(tiles);
        if(current.some((c,i)=>c.color!==firstWave[i].color)) sawColorChanges=true;
        for(const cell of current) for(const neighbor of cell.neighbors.split(',').filter(Boolean).map(Number)) if(cell.color>=0 && current[neighbor].color>=0) assert.notEqual(cell.fill,current[neighbor].fill,'assigned neighbors must differ throughout propagation');

      }
      assert.equal(await page.getByRole('button',{name:'Step propagation',exact:true}).isDisabled(), true);
      assert.ok(sawColorChanges,'stepping must change colors, not only highlights');
      assert.equal(await tiles.locator('[aria-label="OUT=1"]').count(), 1);
      assert.deepEqual((await snapshot(tiles)).map(c=>c.d), before.map(c=>c.d), 'values do not regenerate geometry');
      // Retarget an in-flight wave; the final state must use the newest inputs.
      await page.getByRole('button',{name:'Toggle a',exact:true}).click(); await frame();
      await page.getByRole('button',{name:'Toggle a',exact:true}).click(); await frame();
      await page.getByRole('checkbox',{name:'Animate coloring'}).check(); await settle();
      assert.equal(await tiles.locator('[aria-label="OUT=1"]').count(),1);

      await click('Toggle s');
      assert.equal(await tiles.locator('[aria-label="OUT=0"]').count(), 1);
      await page.getByLabel('Boolean formula',{exact:true}).fill('!(a & b)'); await settle();
      const geometry = (await snapshot(tiles)).map(c=>c.d);
      await tiles.locator('[aria-label="a=0"]').first().locator('text').click(); await settle();
      await tiles.locator('[aria-label="b=0"]').locator('text').click(); await settle();
      assert.equal(await tiles.locator('[aria-label="OUT=0"]').count(), 1);
      assert.deepEqual((await snapshot(tiles)).map(c=>c.d), geometry);
      assert.equal(await page.getByRole('button',{name:'New tiling',exact:true}).count(),0);
      await page.getByLabel('Boolean formula',{exact:true}).fill('a &'); await frame();
      assert.equal(await page.getByRole('alert').count(), 1);
      await page.getByLabel('Boolean formula',{exact:true}).fill('a & !a'); await settle();
      assert.equal(await tiles.locator('[aria-label="OUT=0"]').count(), 1);
      const outside = await tiles.locator('.mosaic-cell').evaluateAll(ns => ns.filter(n => {
        const label=n.querySelector('text'); return label && !n.querySelector('path').isPointInFill(new DOMPoint(+label.getAttribute('x'),+label.getAttribute('y')));
      }).length);
      assert.equal(outside, 0, 'labels remain in their own tiles');
      await tiles.screenshot({path:'/tmp/three-color-tiles-'+file+'.png'});
      await page.getByLabel('Boolean formula',{exact:true}).fill('a|b|c|d|e|f|g'); await frame();
      assert.match(await page.getByRole('alert').innerText(), /at most six variables/);
      // Bypass the HTML maxlength to exercise Elm's own early limit check.
      await page.getByLabel('Boolean formula',{exact:true}).evaluate(node => node.removeAttribute('maxlength'));
      await page.getByLabel('Boolean formula',{exact:true}).fill('!'.repeat(121)+'a'); await frame();
      assert.match(await page.getByRole('alert').innerText(), /120 characters/);
    }
    for (const width of [390,768,1440]) {
      await page.setViewportSize({width,height:900});
      const checkGeometry = async view => {
      const result = await view.locator('svg.mosaic-surface').evaluate(svg => {
        const paths = [...svg.querySelectorAll('.mosaic-cell > path')].map(path => ({path, box:path.getBBox()}));
        const bounds = svg.viewBox.baseVal;
        const step = Math.max(1, Math.sqrt(bounds.width*bounds.height/18000));
        const point = new DOMPoint();
        let overlaps = 0, gaps = 0;
        for(let y=0.37;y<bounds.height-24;y+=step) for(let x=0.31;x<bounds.width-24;x+=step) {
          point.x=x; point.y=y;
          let count=0, filled=0;
          for(const {path,box} of paths) {
            if(x<box.x || x>box.x+box.width || y<box.y || y>box.y+box.height) continue;
            if(path.isPointInFill(point)) { filled++; if(!path.isPointInStroke(point)) count++; }
          }
          if(count>1) overlaps++;
          if(filled===0) gaps++;
        }
        const escapedLabels = [...svg.querySelectorAll('.mosaic-cell text')].filter(label => {
          const p = new DOMPoint(+label.getAttribute('x'),+label.getAttribute('y'));
          return !label.parentNode.querySelector('path').isPointInFill(p);
        }).length;
        return {overlaps, gaps, escapedLabels, curves:paths.every(({path,box}) => box.width < 8 || box.height < 8 || path.getAttribute('d').includes(' Q '))};
      });
      assert.equal(result.gaps,0,'curved cells must fill the entire frame');
      assert.equal(result.overlaps,0,'smooth cells must not overlap away from their shared outlines');
      assert.equal(result.escapedLabels,0,'labels must stay inside their smoothed cell');
      assert.ok(result.curves,'cells must render curved contours');
    };
    for (const file of ['three-color-mosaic.html']) {
        await page.goto(base+'/experiments/'+file);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,file+' overflow '+width);
      }
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: smooth cells without sampled overlaps, multiplexer propagation, stable geometry and responsive layouts.');
  } finally { await browser.close(); await new Promise(r=>server.close(r)); }
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
