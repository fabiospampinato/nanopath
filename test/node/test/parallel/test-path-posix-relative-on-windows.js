
/* IMPORT */

import assert from 'node:assert';
import path from './path.js';

/* MAIN */

// Refs: https://github.com/nodejs/node/issues/13683

const relativePath = path.posix.relative('a/b/c', '../../x');
assert.match(relativePath, /^(\.\.\/){3,5}x$/);
