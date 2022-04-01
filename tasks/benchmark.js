
/* IMPORT */

const {default: tinyPath = require ( '../dist' );
const benchmark = require ( 'benchloop' );

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 100,
  log: 'compact'
});

benchmark ({
  name: 'tiny-path',
  fn: () => {
    //TODO
  }
});

benchmark.summary ();
