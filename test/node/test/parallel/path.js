
/* IMPORT */

const Path = require ( '../../../..' ).default;

/* HELPERS */

const makeError = () => {
  const error = new TypeError ();
  error.code = 'ERR_INVALID_ARG_TYPE';
  throw error;
};

const validateString = value => {
  if ( typeof value === 'string' ) return;
  throw makeError ();
};

const validateStrings = values => {
  for ( let i = 0, l = values.length; i < l; i++ ) {
    validateString ( values[i] );
  }
};

const validateObject = value => {
  if ( typeof value === 'object' && value !== null ) return;
  throw makeError ();
};

/* MAIN */

const Posix = {
  ...Path.posix,
  basename: ( path, ext ) => {
    validateString ( path );
    if ( typeof ext !== 'undefined' ) {
      validateString ( ext );
    }
    return Path.posix.basename ( path, ext );
  },
  dirname: ( path ) => {
    validateString ( path );
    return Path.posix.dirname ( path );
  },
  extname: ( path ) => {
    validateString ( path );
    return Path.posix.extname ( path );
  },
  format: ( path ) => {
    validateObject ( path );
    return Path.posix.format ( path );
  },
  isAbsolute: ( path ) => {
    validateString ( path );
    return Path.posix.isAbsolute ( path );
  },
  join: ( ...paths ) => {
    validateStrings ( paths );
    return Path.posix.join ( ...paths );
  },
  normalize: ( path ) => {
    validateString ( path );
    return Path.posix.normalize ( path );
  },
  parse: ( path ) => {
    validateString ( path );
    return Path.posix.parse ( path );
  },
  relative: ( from, to ) => {
    validateString ( from );
    validateString ( to );
    return Path.posix.relative ( from, to );
  },
  resolve: ( ...paths ) => {
    validateStrings ( paths );
    return Path.posix.resolve ( ...paths );
  },
  toNamespacedPath: ( path ) => {
    return Path.posix.toNamespacedPath ( path );
  }
};

const Win32 = {
  ...Path.win32,
  basename: ( path, ext ) => {
    validateString ( path );
    if ( typeof ext !== 'undefined' ) {
      validateString ( ext );
    }
    return Path.win32.basename ( path, ext );
  },
  dirname: ( path ) => {
    validateString ( path );
    return Path.win32.dirname ( path );
  },
  extname: ( path ) => {
    validateString ( path );
    return Path.win32.extname ( path );
  },
  format: ( path ) => {
    validateObject ( path );
    return Path.win32.format ( path );
  },
  isAbsolute: ( path ) => {
    validateString ( path );
    return Path.win32.isAbsolute ( path );
  },
  join: ( ...paths ) => {
    validateStrings ( paths );
    return Path.win32.join ( ...paths );
  },
  normalize: ( path ) => {
    validateString ( path );
    return Path.win32.normalize ( path );
  },
  parse: ( path ) => {
    validateString ( path );
    return Path.win32.parse ( path );
  },
  relative: ( from, to ) => {
    validateString ( from );
    validateString ( to );
    return Path.win32.relative ( from, to );
  },
  resolve: ( ...paths ) => {
    validateStrings ( paths );
    return Path.win32.resolve ( ...paths );
  },
  toNamespacedPath: ( path ) => {
    if ( typeof path !== 'string' ) return path;
    return Path.win32.toNamespacedPath ( path );
  }
};

Posix.posix = Posix;
Posix.win32 = Win32;

Win32.posix = Posix;
Win32.win32 = Win32;

/* EXPORT */

module.exports = Posix;
