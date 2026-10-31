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
    assert.ok(example.cachedDefaultMatches, "precomputed examples must match generated outlines and constraints");
    assert.ok(example.minimumAreaValid, example.name+" must keep every region above the minimum visible area");
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
    const click = async name => { const start = Date.now(); await page.getByRole('button', { name, exact: true }).click(); if(name === 'Majority of three') { const elapsed = Date.now() - start; console.log('Majority example: ' + elapsed + ' ms'); assert.ok(elapsed < 1000, 'cached Majority geometry must load promptly'); } await settle(); };
    const snapshot = view => view.locator('.mosaic-cell').evaluateAll(ns => ns.map(n => ({
      id: +n.dataset.region, label: n.getAttribute('aria-label'), neighbors: n.dataset.neighbors,
      color: +n.dataset.color, fill: n.querySelector('path').getAttribute('fill'), d: n.querySelector('path').getAttribute('d'), shade: n.querySelector('path').style.filter
    })));
    const checkGeometry = async view => {
      const result = await view.locator('svg.mosaic-surface').evaluate(svg => {
        const paths = [...svg.querySelectorAll('.mosaic-cell > path')].map(path => ({path, box:path.getBBox()}));
        const bounds = svg.viewBox.baseVal;
        const step = Math.max(1, Math.sqrt(bounds.width*bounds.height/18000));
        const minimumArea = (bounds.width - 24) * (bounds.height - 24) / 800;
        const undersized = paths.filter(({path}) => {
          const twiceArea = (path.getAttribute('d').match(/M[^M]+/g) || []).reduce((sum, contour) => {
            const coordinates = contour.match(/-?[0-9]+(?:\.[0-9]+)?(?:e[+-]?[0-9]+)?/g).map(Number);
            for (let i = 0; i < coordinates.length; i += 2) {
              const next = (i + 2) % coordinates.length;
              sum += coordinates[i] * coordinates[next + 1] - coordinates[next] * coordinates[i + 1];
            }
            return sum;
          }, 0);
          return Math.abs(twiceArea) / 2 + 0.000001 < minimumArea;
        }).length;
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
        return {overlaps, gaps, escapedLabels, undersized, polygons:paths.every(({path,box}) => box.width < 8 || box.height < 8 || !/[QC]/.test(path.getAttribute('d')) && path.getAttribute('d').includes(' L '))};
      });
      assert.equal(result.undersized,0,'every polygon must meet the minimum visible area');
      assert.equal(result.gaps,0,'polygonal cells must fill the entire frame');
      assert.equal(result.overlaps,0,'polygonal cells must not overlap away from their shared outlines');
      assert.equal(result.escapedLabels,0,'labels must stay inside their polygonal cell');
      assert.ok(result.polygons,'cells must render straight polygonal contours');
    };
    for (const file of ['three-color-mosaic.html']) {
      await page.goto(base + '/experiments/' + file);
      const tiles = page.locator('.mosaic-map[data-view="organic"]').first();
      const progress = page.getByRole('progressbar', {name:'Coloring progress'});
      const phase = page.locator('.mosaic-playback-state');
      const setDelay = value => page.getByRole('slider', {name:'Time per step'}).evaluate((node,value) => {node.value=String(value);node.dispatchEvent(new Event('input',{bubbles:true}));}, value);
      // Restart and pause in one turn so the timer cannot race the assertion.
      await page.evaluate(() => {
        [...document.querySelectorAll('button')].find(b=>b.textContent==='Replay coloring').click();
        document.querySelector('.mosaic-playback input[type=checkbox]').click();
      });
      await frame();
      assert.equal(await phase.innerText(), 'Ready');
      assert.equal(await progress.getAttribute('value'), '0');
      const unrevealed = await snapshot(tiles);
      assert.ok(unrevealed.every(cell=>cell.color<0));
      await page.getByRole('button',{name:'Next step',exact:true}).click(); await frame();
      assert.equal(await phase.innerText(), 'Paused');
      assert.equal(await progress.getAttribute('value'), '1');
      assert.equal((await snapshot(tiles)).filter(cell=>cell.color>=0).length,1,'initial drawing reveals one region per step');
      await page.getByRole('button',{name:'Previous step',exact:true}).click(); await frame();
      assert.deepEqual((await snapshot(tiles)).map(cell=>cell.color),unrevealed.map(cell=>cell.color),'previous restores the prior frame');
      await setDelay(1000);
      await page.getByRole('button',{name:'Resume coloring',exact:true}).click(); await frame();
      assert.equal(await phase.innerText(),'Drawing');
      const slowStart = +(await progress.getAttribute('value'));
      await page.waitForTimeout(300);
      assert.ok(+(await progress.getAttribute('value'))-slowStart<=1,'slow playback must remain easy to follow');
      await page.getByRole('button',{name:'Pause coloring',exact:true}).click(); await frame();
      const pausedAt = await progress.getAttribute('value');
      await page.waitForTimeout(180);
      assert.equal(await progress.getAttribute('value'),pausedAt,'pause must stop advancement');
      await setDelay(50);
      await page.getByRole('button',{name:'Replay coloring',exact:true}).click(); await frame();
      await page.waitForFunction(()=>+document.querySelector('.mosaic-playback progress').value>=3, {}, {timeout:1500});
      await settle();
      assert.equal(await phase.innerText(),'Finished');
      assert.equal(await progress.getAttribute('value'),await progress.getAttribute('max'));
      await page.getByRole('button',{name:'Selected',exact:true}).click(); await frame();
      assert.equal(await phase.innerText(),'Finished');
      assert.equal(await progress.getAttribute('value'),await progress.getAttribute('max'),'a no-op is still shown as complete');

      const startup = await page.evaluate(() => performance.getEntriesByName('map-startup')[0].duration);
      assert.ok(startup < 2000, `default map must avoid expensive startup generation (${startup} ms)`);
      for (const name of results.slice(0,12).map(e => e.name)) {
        await click(name);
        assert.equal(await page.getByRole('alert').count(), 0);
        await checkGeometry(tiles);
        if (name === 'Majority of three') {
          const packing = await tiles.locator('.mosaic-cell title').allTextContents().then(labels => labels.filter(label => label.includes('Packing cell')).length);
          const islandArea = await tiles.locator('.mosaic-cell[data-region="32"] > path').evaluate(path => {
            const values = path.getAttribute('d').match(/-?[0-9]+(?:\.[0-9]+)?(?:e[+-]?[0-9]+)?/g).map(Number);
            let twiceArea = 0;
            for (let i = 0; i < values.length; i += 2) {
              const next = (i + 2) % values.length;
              twiceArea += values[i] * values[next + 1] - values[next] * values[i + 1];
            }
            return Math.abs(twiceArea) / 2;
          });
          assert.ok(islandArea > 300, 'polygon simplification must preserve the small neutral island');
          assert.ok(packing <= 6, 'repeated packing slivers must join into continuous separators');
          assert.ok(await tiles.locator('.mosaic-cell').count() <= 78, 'Majority must avoid the repeated packing cells');
        }
        if (name === 'Enabled OR') assert.ok(await tiles.locator('.mosaic-cell').count() < 44, 'redundant physical packing cells should be absorbed');
        const cells = await snapshot(tiles);
        assert.ok(cells.every(c => ['#bb5961','#397d68','#426f9f'].includes(c.fill)));
        for(const cell of cells) for(const neighbor of cell.neighbors.split(',').filter(Boolean).map(Number)) assert.notEqual(cell.fill,cells[neighbor].fill,name+' must be a proper three-color map');


      }
      assert.equal(await page.locator('.signal-link').count(), 0);
      await click('Multiplexer');
      const before = await snapshot(tiles);
      const priorOutput = before.find(c=>c.label.startsWith('OUT=')).label;
      await page.getByRole('checkbox', {name:'Animate coloring'}).uncheck();
      await page.getByRole('button', {name:'Toggle a',exact:true}).click(); await frame();
      assert.equal(await tiles.getAttribute('data-propagating'), 'true');
      assert.ok((await page.locator('.mosaic-playback-heading').innerText()).includes('Recoloring'));
      assert.equal((await snapshot(tiles)).find(c=>c.label.startsWith('OUT=')).label, priorOutput, 'OUT must wait for the signal');
      const firstWave = await snapshot(tiles);
      assert.ok(firstWave.filter((c,i)=>c.fill!==before[i].fill).every(c=>c.label.startsWith('a=')), 'first frame changes only the toggled input regions');
      assert.ok(firstWave.filter(c => c.color < 0).every(c => c.fill === before[c.id].fill && c.shade.includes('brightness')), 'unresolved tiles retain their previous hue with shading');
      let sawColorChanges = false;
      for (let i=0; i<1000 && !(await page.getByRole('button',{name:'Next step',exact:true}).isDisabled()); i++) {
        await page.getByRole('button',{name:'Next step',exact:true}).click(); await frame();
        const current=await snapshot(tiles);
        if(current.some((c,i)=>c.color!==firstWave[i].color)) sawColorChanges=true;
        for(const cell of current) for(const neighbor of cell.neighbors.split(',').filter(Boolean).map(Number)) if(cell.color>=0 && current[neighbor].color>=0) assert.notEqual(cell.fill,current[neighbor].fill,'assigned neighbors must differ throughout propagation');

      }
      assert.equal(await page.getByRole('button',{name:'Next step',exact:true}).isDisabled(), true);
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
        return {overlaps, gaps, escapedLabels, polygons:paths.every(({path,box}) => box.width < 8 || box.height < 8 || !/[QC]/.test(path.getAttribute('d')) && path.getAttribute('d').includes(' L '))};
      });
      assert.equal(result.gaps,0,'polygonal cells must fill the entire frame');
      assert.equal(result.overlaps,0,'polygonal cells must not overlap away from their shared outlines');
      assert.equal(result.escapedLabels,0,'labels must stay inside their polygonal cell');
      assert.ok(result.polygons,'cells must render straight polygonal contours');
    };
    for (const file of ['three-color-mosaic.html']) {
        await page.goto(base+'/experiments/'+file);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,file+' overflow '+width);
      }
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: polygonal cells without sampled overlaps, multiplexer propagation, stable geometry and responsive layouts.');
  } finally { await browser.close(); await new Promise(r=>server.close(r)); }
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
