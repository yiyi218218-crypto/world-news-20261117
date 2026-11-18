// Hands the day's front page in: copies the finished image to /output/entry.png.
// The image is drawn once, at build time, from design/front-page.html by tools/render.mjs, so
// this program only moves bytes and both graded runs write exactly the same file.
//
// Run it outside the grader with a local output folder:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(root, 'entry.png');

// Refuse to hand in an image the gate would refuse anyway.
if (!existsSync(source)) {
  throw new Error('entry.png is missing: run node tools/render.mjs first');
}
if (statSync(source).size > 1024 * 1024) {
  throw new Error('entry.png is over 1 MiB: the gate refuses it');
}

mkdirSync(output, { recursive: true });
copyFileSync(source, join(output, 'entry.png'));

console.log('handed in entry.png');
