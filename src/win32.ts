
/* IMPORT */

import {FALLBACK_MATCH} from './constants';
import {getCwd, getEnv} from './utils';
import type {PathObject} from './types';

/* MAIN */

const Win32 = {

  /* VARIABLES */

  delimiter: ';',
  sep: '\\',

  /* API */

  basename: ( path: string, ext: string ): string => {

    if ( path === ext ) return '';

    const {base} = Win32.parse ( path );

    if ( !ext || !base.endsWith ( ext ) ) return base;

    return base.slice ( 0, -ext.length ) || base;

  },

  dirname: ( path: string ): string => {

    return Win32.parse ( path ).dir || '.';

  },

  extname: ( path: string ): string => {

    return Win32.parse ( path ).ext;

  },

  format: ( path: PathObject ): string => {

    const {root, dir, base} = path;

    if ( !dir || dir === root ) return `${root}${base}`;

    return `${dir}\\${base}`;

  },

  isAbsolute: ( path: string ): boolean => {

    return /^[\\\/]|^[a-zA-Z]:[\\\/]/.test ( path );

  },

  join: ( ...paths: string[] ): string => {

    if ( !paths.length ) return '.';

    const filtered = paths.filter ( Boolean );

    if ( !filtered.length ) return '.';

    let path = filtered.join ( '\\' );

    if ( !/^[\\\/]{0,2}[^\\\/]/.test ( filtered[0] ) ) { // Trimming slashes in non-obvious UNC paths

      path = path.replace ( /^[\\\/]+/, '\\' );

    }

    return Win32.normalize ( path );

  },

  normalize: ( path: string ): string => {

    path = path.replace ( /\//g, '\\' );

    const isAbsolute = Win32.isAbsolute ( path );
    const isTrailing = path.endsWith ( '\\' );
    const fallback = isAbsolute ? '\\' : ( isTrailing ? '.\\' : '.' );

    path = path.replace ( /\\{3,}/g, '\\' );
    path = path.replace ( /(.)\\{2,}/g, '$1\\' );

    while ( true ) {

      let next = path;

      next = next.replace ( /^\.\\/, '' );
      next = next.replace ( /^([a-zA-Z]:)\.\\(.)/, '$1$2' );
      next = next.replace ( /^\\\.\.(\\|$)/, '\\' );
      next = next.replace ( /^(?!(?:[a-zA-Z]:)?\.\.\\)([^\\]+)\\\.\.(?=\\|$)/, '.' );
      next = next.replace ( /\\(?!\.\.\\)([^\\]+)\\\.\.$/, '' );
      next = next.replace ( /\\(?!\.\.\\)([^\\]+)\\\.\.\\/, '\\' );
      next = next.replace ( /(^[a-zA-Z]:|^(?![a-zA-Z]:)|\\)([^\\]+)\\\.(?=\\|$)/, '$1$2' );
      next = next.replace ( /(^|\\)\.\\/, '$1' );
      next = next.replace ( /(^|\\)\.(?=\\|$)/, '$1' );

      if ( next === path ) break;

      path = next;

    }

    path = path.replace ( /^([a-zA-Z]:)$/, '$1.' );
    path = path.replace ( /^\\\\([^\\]+)$/, '\\$1' );
    path = path.replace ( /^\\\\([^\\]+)\\$/, '\\$1\\' );
    path = path.replace ( /^(\\\\[^\\]+\\[^\\]+)$/, '$1\\' );

    return path || fallback;

  },

  parse: ( path: string ): PathObject => {

    const re = /^(((?:\\\\[^\\]+\\[^\\]+\\?|\/\/[^\/]+\/[^\/]+\/?|[\\\/]|[a-zA-Z]:[\\\/]?|)?)(?:.*(?=[\\\/]+[^\\\/]))?)[\\\/]?((\.?(?:.+(?=\.)|\.(?=[\\\/]|$)|[^\.\\\/]*))((?:\.[^\\\/]*)?))[\\\/]*$/;
    const match = re.exec ( path ) || FALLBACK_MATCH;
    const [, dir, root, base, name, ext] = match;

    return { root, dir, base, name, ext };

  },

  relative: ( from: string, to: string ): string => {

    if ( from === to ) return '';

    const fromOrig = Win32.resolve ( from );
    const toOrig = Win32.resolve ( to );

    if ( fromOrig === toOrig ) return '';

    from = fromOrig.toLowerCase ();
    to = toOrig.toLowerCase ();

    if ( from === to ) return '';

    //TODO: Rewrite the following, which is Node's code

    const sepCode = 92;

    // Trim any leading backslashes
    let fromStart = 0;
    while (fromStart < from.length && from.charCodeAt (fromStart) === sepCode) {
      fromStart++;
    }
    // Trim trailing backslashes (applicable to UNC paths only)
    let fromEnd = from.length;
    while ( fromEnd - 1 > fromStart && from.charCodeAt (fromEnd - 1) === sepCode ) {
      fromEnd--;
    }
    const fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    let toStart = 0;
    while (toStart < to.length && to.charCodeAt (toStart) === sepCode) {
      toStart++;
    }
    // Trim trailing backslashes (applicable to UNC paths only)
    let toEnd = to.length;
    while (toEnd - 1 > toStart && to.charCodeAt (toEnd - 1) === sepCode) {
      toEnd--;
    }
    const toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i < length; i++) {
      const fromCode = from.charCodeAt(fromStart + i);
      if (fromCode !== to.charCodeAt(toStart + i)) {
        break;
      } else if (fromCode === sepCode) {
        lastCommonSep = i;
      }
    }

    // We found a mismatch before the first common path separator was seen, so
    // return the original `to`.
    if (i !== length) {
      if (lastCommonSep === -1)
        return toOrig;
    } else {
      if (toLen > length) {
        if (to.charCodeAt(toStart + i) === sepCode) {
          // We get here if `from` is the exact base path for `to`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
          return toOrig.slice(toStart + i + 1);
        }
        if (i === 2) {
          // We get here if `from` is the device root.
          // For example: from='C:\\'; to='C:\\foo'
          return toOrig.slice(toStart + i);
        }
      }
      if (fromLen > length) {
        if (from.charCodeAt(fromStart + i) === sepCode) {
          // We get here if `to` is the exact base path for `from`.
          // For example: from='C:\\foo\\bar'; to='C:\\foo'
          lastCommonSep = i;
        } else if (i === 2) {
          // We get here if `to` is the device root.
          // For example: from='C:\\foo\\bar'; to='C:\\'
          lastCommonSep = 3;
        }
      }
      if (lastCommonSep === -1) {
        lastCommonSep = 0;
      }
    }

    let out = '';
    // Generate the relative path based on the path difference between `to` and
    // `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd ||
          from.charCodeAt(i) === sepCode) {
        out += out.length === 0 ? '..' : '\\..';
      }
    }

    toStart += lastCommonSep;

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) {
      return `${out}${toOrig.slice(toStart, toEnd)}`;
    }

    if (toOrig.charCodeAt(toStart) === sepCode) {
      ++toStart;
    }

    return toOrig.slice(toStart, toEnd);

  },

  resolve: ( ...paths: string[] ): string => {

    //TODO: Rewrite the following, which is Node's code

    const isPathSeparator = ( code: number ): boolean => {
      return code === 47 || code === 92;
    };

    const isWindowsDeviceRoot = ( code: number ): boolean => {
      return ( code >= 65 && code <= 90 ) || ( code >= 97 && code <= 122 );
    };

    let args = paths;
    let resolvedDevice = '';
    let resolvedTail = '';
    let resolvedAbsolute = false;

    for (let i = args.length - 1; i >= -1; i--) {
      let path;
      if (i >= 0) {
        path = args[i];
        // Skip empty entries
        if (path.length === 0) {
          continue;
        }
      } else if (!resolvedDevice.length) {
        path = getCwd ();
      } else {
        // Windows has the concept of drive-specific current working
        // directories. If we've resolved a drive letter but not yet an
        // absolute path, get cwd for that drive, or the process cwd if
        // the drive cwd is not available. We're sure the device is not
        // a UNC path at this points, because UNC paths are always absolute.
        path = getEnv ( `=${resolvedDevice}` ) || getCwd ();

        // Verify that a cwd was found and that it actually points
        // to our drive. If not, default to the drive's root.
        if (path === undefined || (path.slice (0, 2).toLowerCase ()) !== resolvedDevice.toLowerCase () && path.charCodeAt(2) === 92) {
          path = `${resolvedDevice}\\`;
        }
      }

      const len = path.length;
      let rootEnd = 0;
      let device = '';
      let isAbsolute = false;
      const code = path.charCodeAt(0);

      // Try to match a root
      if (len === 1) {
        if (isPathSeparator(code)) {
          // `path` contains just a path separator
          rootEnd = 1;
          isAbsolute = true;
        }
      } else if (isPathSeparator(code)) {
        // Possible UNC root

        // If we started with a separator, we know we at least have an
        // absolute path of some kind (UNC or otherwise)
        isAbsolute = true;

        if (isPathSeparator(path.charCodeAt(1))) {
          // Matched double path separator at beginning
          let j = 2;
          let last = j;
          // Match 1 or more non-path separators
          while (j < len && !isPathSeparator(path.charCodeAt(j))) {
            j++;
          }
          if (j < len && j !== last) {
            const firstPart = path.slice (last, j);
            // Matched!
            last = j;
            // Match 1 or more path separators
            while (j < len && isPathSeparator(path.charCodeAt(j))) {
              j++;
            }
            if (j < len && j !== last) {
              // Matched!
              last = j;
              // Match 1 or more non-path separators
              while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                j++;
              }
              if (j === len || j !== last) {
                // We matched a UNC root
                device = `\\\\${firstPart}\\${path.slice (last, j)}`;
                rootEnd = j;
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === 58) {
        // Possible device root
        device = path.slice (0, 2);
        rootEnd = 2;
        if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
          // Treat separator following drive name as an absolute path
          // indicator
          isAbsolute = true;
          rootEnd = 3;
        }
      }

      if (device.length > 0) {
        if (resolvedDevice.length > 0) {
          if ((device.toLowerCase ()) !== (resolvedDevice.toLowerCase ())) {
            // This path points to another device so it is not applicable
            continue;
          }
        } else {
          resolvedDevice = device;
        }
      }

      if (resolvedAbsolute) {
        if (resolvedDevice.length > 0) {
          break;
        }
      } else {
        resolvedTail = `${path.slice (rootEnd)}\\${resolvedTail}`;
        resolvedAbsolute = isAbsolute;
        if (isAbsolute && resolvedDevice.length > 0) {
          break;
        }
      }
    }

    // At this point the path should be resolved to a full absolute path,
    // but handle relative paths to be safe (might happen when process.cwd()
    // fails)

    // Normalize the tail path
    resolvedTail = Win32.normalize ( resolvedTail ).replace ( /(.)[\\\/]+$/, '$1' ).replace ( /^[\\\/]+(.)/g, '$1' );

    return resolvedAbsolute ? `${resolvedDevice}\\${resolvedTail === '\\' ? '' : resolvedTail}` : `${resolvedDevice}${resolvedTail}` || '.';

  },

  toNamespacedPath: ( path: string ): string => {

    const resolved = Win32.resolve ( path );

    if ( /^(\\\\|\/\/)(?![\.\?\\\/])/.test ( path ) ) { // Converting non-long UNC to long UNC

      return `\\\\?\\UNC\\${resolved.slice ( 2 )}`;

    }

    if ( /^[a-zA-Z]:/.test ( path ) ) { // Converting device path to long UNC

      return `\\\\?\\${resolved}`;

    }

    return path;

  }

};

/* EXPORT */

export default Win32;
