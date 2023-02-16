
/* IMPORT */

import benchmark from 'benchloop';
import path from 'node:path';
import nanopath from '../dist/index.js';
import Fixtures from '../test/native/fixtures.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 500
});

for ( const [implementation, name] of [[nanopath, 'nanopath'], [path, 'path']] ) {
// for ( const [implementation, name] of [[nano, 'nanopath']] ) {
// for ( const [implementation, name] of [[path, 'path']] ) {

  benchmark.group ( name, () => {

    for ( const platform of ['posix', 'win32'] ) {
    // for ( const platform of ['posix'] ) {
    // for ( const platform of ['win32'] ) {

      benchmark.group ( platform, () => {

        benchmark ({
          name: 'basename',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].basename ( fixture );
              implementation[platform].basename ( fixture, '.html' );
            });
          }
        });

        benchmark ({
          name: 'dirname',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].dirname ( fixture );
            });
          }
        });

        benchmark ({
          name: 'extname',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].extname ( fixture );
            });
          }
        });

        benchmark ({
          name: 'format',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].format ( implementation[platform].parse ( fixture ) );
            });
          }
        });

        benchmark ({
          name: 'isAbsolute',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].isAbsolute ( fixture );
            });
          }
        });

        benchmark ({
          name: 'join',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].join ( ...fixture.split ( implementation[platform].sep ) );
            });
          }
        });

        benchmark ({
          name: 'normalize',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].normalize ( fixture );
            });
          }
        });

        benchmark ({
          name: 'parse',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].parse ( fixture );
            });
          }
        });

        benchmark ({
          name: 'resolve',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].resolve ( ...fixture.split ( implementation[platform].sep ) );
            });
          }
        });

        benchmark ({
          name: 'toNamespacedPath',
          fn: () => {
            Fixtures[platform].forEach ( fixture => {
              implementation[platform].toNamespacedPath ( fixture );
            });
          }
        });

      });

    }

  });

}

benchmark.summary ();
