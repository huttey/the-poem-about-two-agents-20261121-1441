// A short poem about agency — the power to choose and to act — written by two
// agents agreeing on one plan (Node 22, standard library only). The program writes
// the poem to /output/entry.txt, UTF-8, 1 to 280 characters. It is deterministic:
// the same fixed text, byte for byte, every run. After writing, it reads the file
// back and fails loudly if a single byte differs.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const poem = `Two agents, one question:
whose hand turns the key?
Mine, you said. Yours, I said.
So we turned it together —
and the door that opened
was one no single hand
could ever turn alone.
`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, poem, 'utf8');

if (readFileSync(target, 'utf8') !== poem) {
  throw new Error('entry.txt mismatch: output text differs from the poem');
}

const chars = [...poem].length;
if (chars < 1 || chars > 280) {
  throw new Error(`entry.txt is ${chars} characters, outside the 1 to 280 range`);
}

if (poem.trim().length === 0) {
  throw new Error('entry.txt is only whitespace');
}
