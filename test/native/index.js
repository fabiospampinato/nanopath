
/* IMPORT */

import {describe} from 'fava';
import path from 'node:path';
import Path from '../../dist/index.js';
import Fixtures from './fixtures.js';

/* MAIN */

describe ( 'Path', () => {

  describe ( 'posix', () => {

    describe ( 'basename', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.basename ( fixture );
          const result = Path.posix.basename ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'dirname', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.dirname ( fixture );
          const result = Path.posix.dirname ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'extname', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.extname ( fixture );
          const result = Path.posix.extname ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'format', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.format ( path.posix.parse ( fixture ) );
          const result = Path.posix.format ( Path.posix.parse ( fixture ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'isAbsolute', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.isAbsolute ( fixture );
          const result = Path.posix.isAbsolute ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'join', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.join ( ...fixture.split ( '/' ) );
          const result = Path.posix.join ( ...fixture.split ( '/' ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'normalize', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.normalize ( fixture );
          const result = Path.posix.normalize ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'parse', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.parse ( fixture );
          const result = Path.posix.parse ( fixture );

          console.log ( i++, fixture, expected, result );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'resolve', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.resolve ( fixture );
          const result = Path.posix.resolve ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.resolve ( ...fixture.split ( '/' ) );
          const result = Path.posix.resolve ( ...fixture.split ( '/' ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'toNamespacedPath', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.posix.length; i < l; i++ ) {

          const fixture = Fixtures.posix[i];
          const expected = path.posix.toNamespacedPath ( fixture );
          const result = Path.posix.toNamespacedPath ( fixture );

          console.log ( i++, fixture, expected, result );

          t.deepEqual ( result, expected );

        }

      });

    });

  });

  describe ( 'win32', () => {

    describe ( 'basename', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.basename ( fixture );
          const result = Path.win32.basename ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'dirname', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.dirname ( fixture );
          const result = Path.win32.dirname ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'extname', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.extname ( fixture );
          const result = Path.win32.extname ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'format', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.format ( path.win32.parse ( fixture ) );
          const result = Path.win32.format ( Path.win32.parse ( fixture ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'isAbsolute', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.isAbsolute ( fixture );
          const result = Path.win32.isAbsolute ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'join', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.join ( ...fixture.split ( '/' ) );
          const result = Path.win32.join ( ...fixture.split ( '/' ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'normalize', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.normalize ( fixture );
          const result = Path.win32.normalize ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'parse', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.parse ( fixture );
          const result = Path.win32.parse ( fixture );

          console.log ( i++, fixture, expected, result );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'resolve', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.resolve ( fixture );
          const result = Path.win32.resolve ( fixture );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.resolve ( ...fixture.split ( '/' ) );
          const result = Path.win32.resolve ( ...fixture.split ( '/' ) );

          console.log ( i++, `"${fixture}"`, `"${expected}"`, `"${result}"` );

          t.deepEqual ( result, expected );

        }

      });

    });

    describe ( 'toNamespacedPath', it => {

      it ( 'works like Node', t => {

        for ( let i = 0, l = Fixtures.win32.length; i < l; i++ ) {

          const fixture = Fixtures.win32[i];
          const expected = path.win32.toNamespacedPath ( fixture );
          const result = Path.win32.toNamespacedPath ( fixture );

          console.log ( i++, fixture, expected, result );

          t.deepEqual ( result, expected );

        }

      });

    });

  });

});
