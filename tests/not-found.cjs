const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const pagesMode = Boolean(process.env.SITE_ROOT);
const args = ['scripts/serve.py', '--port', '0'];
if (pagesMode) args.push('--directory', process.env.SITE_ROOT, '--pages');
const server = spawn('python3', args, { stdio: ['ignore', 'pipe', 'pipe'] });
(async () => {
  const base = await new Promise((resolve, reject) => {
    server.stdout.once('data', data => resolve(data.toString().trim().replace('Preview: ', '')));
    server.once('error', reject);
    server.once('exit', code => reject(new Error('Preview server exited: ' + code)));
  });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    // Development preview redirects; GitHub Pages returns 404 for retired files.
    for (const [route, target] of [
      ['/experiments/three-color.html', '/experiments/three-color-mosaic.html'],
      ['/experiments/formula-comparison.html', '/experiments/three-color-mosaic.html'],
      ['/experiments/map-drawing-puzzle.html', '/experiments/three-color-mosaic.html'],
      ['/projects/lms/index.html', '/projects/lms/demo/index.html']
    ]) {
      const response = await page.request.get(base + route, { maxRedirects: 0 });
      assert.equal(response.status(), pagesMode ? 404 : 301, `${route} must match the selected host routing`);
      if (!pagesMode) assert.equal(new URL(response.headers()['location'], base).pathname, target, `${route} must point at ${target}`);
    }

    // Removed and unknown paths must answer with a genuine HTTP 404.
    for (const route of ['/missing/deep/page', '/experiments/ascii-automata.html']) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 404, `${route} must be a genuine 404`);
      await page.getByRole('heading', { name: 'This page performed a disappearing act.' }).waitFor();
      const field = page.locator('#automata');
      const initial = await field.textContent();
      assert.ok(initial.includes('#'));
      await page.getByRole('button', { name: 'Pause the organisms' }).waitFor();
      await page.waitForFunction(previous => document.getElementById('automata').textContent !== previous, initial);
      await page.getByRole('button', { name: 'Pause the organisms' }).click();
      const still = await field.textContent();
      await page.waitForTimeout(250);
      assert.equal(await field.textContent(), still);
      await page.getByRole('button', { name: 'Wake the organisms' }).click();
      await page.waitForFunction(previous => document.getElementById('automata').textContent !== previous, still);
      await page.getByRole('button', { name: 'Pause the organisms' }).click();
      for (const link of await page.locator('nav a').evaluateAll(nodes => nodes.map(n => n.href))) {
        assert.equal((await page.request.get(link)).status(), 200);
      }
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({width, height:900});
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({path:`/tmp/not-found-${width}.png`});
    }
    assert.deepEqual(errors, []);
    console.log('PASS: ' + (pagesMode ? 'GitHub Pages-style retired-route 404s' : 'local 301 redirects') + ', unknown-path 404s, animation controls, recovery links, mobile and desktop.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.kill());
