
/* IMPORT */

import nodePath from 'node:path';
import dirname from 'tiny-dirname';

/* MAIN */

const path = ( ...args ) => {

  const fixturesDir = nodePath.join ( dirname ( import.meta.url ), '..', 'fixtures' );

  return nodePath.join ( fixturesDir, ...args );

};

/* EXPORT */

export {path};
