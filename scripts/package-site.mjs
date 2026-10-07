import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicFiles } from './public-files.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'dist');
// Validate every input before replacing an existing release directory.
for (const file of publicFiles) {
  if (!fs.statSync(path.join(root, file)).isFile()) throw new Error('Missing public file: ' + file);
}
const staging = fs.mkdtempSync(path.join(root, '.dist-'));
try {
  for (const file of publicFiles) {
    const target = path.join(staging, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, file), target);
  }
  fs.writeFileSync(path.join(staging, '.nojekyll'), '');
  fs.rmSync(destination, { recursive: true, force: true });
  fs.renameSync(staging, destination);
  console.log(`Packaged ${publicFiles.length + 1} public files into dist/.`);
} finally {
  fs.rmSync(staging, { recursive: true, force: true });
}
