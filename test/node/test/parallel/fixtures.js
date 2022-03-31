
module.exports.path = ( ...args ) => {

  const path = require ( 'path' );

  const fixturesDir = path.join ( __dirname, '..', 'fixtures' );

  return path.join ( fixturesDir, ...args );

};
