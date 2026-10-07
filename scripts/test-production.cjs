const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');

(async () => {
  const root = path.resolve(__dirname, '..');
  const release = path.join(root, 'dist');
  const { publicFiles } = await import('./public-files.mjs');
  const actual = fs.readdirSync(release, { recursive: true, withFileTypes: true })
    .map(entry => {
      assert.ok(!entry.isSymbolicLink(), 'Public artifact must not contain symlinks');
      return entry.isFile() ? path.relative(release, path.join(entry.parentPath, entry.name)).split(path.sep).join('/') : null;
    }).filter(Boolean).sort();
  assert.deepEqual(actual, [...publicFiles, '.nojekyll'].sort(), 'Artifact must contain exactly the public files');
  console.log('PASS: production file inventory; sources, caches, lab, and developer files excluded.');
  for (const file of ['site.cjs', 'lms.cjs', 'not-found.cjs', 'three-color.cjs']) {
    const result = spawnSync(process.execPath, [path.join(root, 'tests', file)], {
      cwd: root, stdio: 'inherit', timeout: 12 * 60 * 1000,
      env: { ...process.env, SITE_ROOT: release, REFRESH_LMS_PREVIEW: '0' },
    });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(`${file} failed (${result.status ?? result.signal})`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
