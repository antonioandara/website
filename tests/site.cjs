const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const sourceRoot = path.resolve(__dirname, '..');
const root = process.env.SITE_ROOT ? path.resolve(process.env.SITE_ROOT) : sourceRoot;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const waitActive = section => page.waitForFunction(id => document.querySelector(`[data-chapter="${id}"]`).getAttribute('aria-current') === 'location', section);
  const checkLinks = async () => {
    const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href));
    for (const href of links) {
      const url = new URL(href);
      if (url.origin === base) {
        const file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);
        assert.ok(fs.existsSync(file), `Broken local link: ${href}`);
        if (url.pathname === new URL(page.url()).pathname && url.hash) assert.equal(await page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`).count(), 1);
      }
    }
  };
  try {
    await page.goto(base + '/index.html');
    assert.match(await page.locator('h1').innerText(), /Antonio\s+Andara/);
    assert.equal(await page.locator('.chapter').count(), 8);
    const profiles = ['https://github.com/antonioandara','https://x.com/A3L','https://www.linkedin.com/in/antonio-alejandro-andara-lara-ab5453a4/','https://www.youtube.com/@andaralabs'];
    for (const profile of profiles) assert.ok(await page.locator(`a[href="${profile}"]`).count() > 0);
    await checkLinks();
    assert.equal(await page.locator('.theme-toggle').innerText(), 'Dark mode');
    await page.screenshot({path:'/tmp/antonio-andara-desktop.png'});
    await page.locator('.theme-toggle').click();
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    await page.reload();
    assert.equal(await page.locator('.theme-toggle').innerText(), 'Light mode');
    await page.locator('.theme-toggle').click();
    await page.locator('.menu-toggle').click();
    await page.waitForFunction(() => document.activeElement.id === 'sidebar-close');
    await page.locator('[data-chapter="magic"]').click();
    await waitActive('magic');
    assert.equal(await page.locator('#magic').evaluate(node => document.activeElement === node), true);
    assert.ok((await page.locator('#magic').boundingBox()).y >= 68);
    await page.screenshot({path:'/tmp/antonio-andara-magic.png'});
    const sidebarOpen = async () => assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
    await sidebarOpen();
    const before = await page.locator('.page-body').boundingBox();
    await page.locator('#magic .large-copy').click();
    await sidebarOpen();
    assert.equal((await page.locator('.page-body').boundingBox()).x, before.x);
    await page.locator('.theme-toggle').click();
    await sidebarOpen();
    await page.locator('.theme-toggle').click();
    assert.ok(await page.locator('#journal .field-note, #journal .section-empty').count() > 0, 'journal must render entries or a defined empty state');
    await page.locator('[data-chapter="engineering"]').click();
    await waitActive('engineering');
    await page.locator('#engineering details.field-note summary').first().click();
    await sidebarOpen();
    await page.locator('#engineering details.field-note summary').first().click();
    await page.goBack();
    await waitActive('magic');
    await sidebarOpen();
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement.id === 'menu-toggle');
    await page.locator('#engineering details.field-note summary').first().click();
    assert.equal(await page.locator('#engineering details[open]').count(), 1);
    await page.goto(base + '/index.html#connect');
    await waitActive('connect');
    for (const width of [320,390,768,1024,1440]) {
      await page.setViewportSize({width,height:900});
      await page.locator('.menu-toggle').click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
      const side = await page.locator('.sidebar').boundingBox(), content = await page.locator('.page-body').boundingBox();
      assert.ok(side.x + side.width <= content.x + 1);
      await page.keyboard.press('Escape');
    }
    await page.locator('.menu-toggle').click();
    await page.locator('#sidebar-close').click();
    await page.waitForFunction(() => document.querySelector('.menu-toggle').getAttribute('aria-expanded') === 'false');
    await page.setViewportSize({width:390,height:844});
    await page.goto(base + '/index.html');
    await page.screenshot({path:'/tmp/antonio-andara-mobile.png',fullPage:true});
    await page.goto(base + '/library.html#library');
    await waitActive('library');
    assert.equal(await page.locator('.library-item').count(),18);
    for(const [category,count] of [['Concepts',3],['Patterns',3],['All',18]]) {
      await page.locator(`[data-filter="${category}"]`).click();
      await page.waitForFunction(expected => [...document.querySelectorAll('.library-item')].filter(node => !node.hidden).length === expected, count);
      assert.equal(await page.locator('.library-item:visible').count(),count);
    }
    await checkLinks();
    await page.locator('.reading-header a[href="index.html#engineering"]').click();
    await page.waitForURL('**/index.html#engineering');
    await waitActive('engineering');
    await page.goto(base + '/experiments/three-color-mosaic.html');
    await checkLinks();
    assert.ok(await page.locator('h1').count());
    assert.deepEqual(errors,[]);
    console.log('PASS: identity, four profile URLs, eight sections, themes/persistence, navigation/focus, journal state, library, bundled experiment, local links, five responsive widths, no runtime errors.');
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
