
/* IMPORT */

import {NO_MATCH} from './constants';
import {findLastIndex, getCwdPosix} from './utils';
import {PathObject} from './types';

/* MAIN */

const Posix = {

  /* VARIABLES */

  delimiter: ':',
  sep: '/',

  /* API */

  basename: ( path: string, ext?: string ): string => {

    if ( path === ext ) return '';

    const {base} = Posix.parse ( path );

    if ( !ext || !base.endsWith ( ext ) ) return base;

    return base.slice ( 0, -ext.length ) || base;

  },

  dirname: ( path: string ): string => {

    return Posix.parse ( path ).dir || '.';

  },

  extname: ( path: string ): string => {

    return Posix.parse ( path ).ext;

  },

  format: ( path: PathObject ): string => {

    const {root, dir, base} = path;

    if ( !dir || dir === root ) return `${root}${base}`;

    return `${dir}/${base}`;

  },

  isAbsolute: ( path: string ): boolean => {

    return path.startsWith ( '/' );

  },

  join: ( ...paths: string[] ): string => {

    if ( !paths.length ) return '.';

    const filtered = paths.filter ( Boolean );

    if ( !filtered.length ) return '.';

    const path = filtered.join ( '/' );

    return Posix.normalize ( path );

  },

  normalize: ( path: string ): string => {

    const isAbsolute = Posix.isAbsolute ( path );
    const isTrailing = path.endsWith ( '/' );
    const fallback = isAbsolute ? '/' : ( isTrailing ? './' : '.' );

    path = path.replace ( /\/+/g, '/' );

    while ( true ) {

      let next = path;

      next = next.replace ( /^\.\//, '' );
      next = next.replace ( /^\/+\.\.(\/|$)/, '/' );
      next = next.replace ( /^(?!\.\.\/)([^\/]+)\/+\.\.(?=\/|$)/, '.' );
      next = next.replace ( /\/+(?!\.\.\/)([^\/]+)\/+\.\.$/, '' );
      next = next.replace ( /\/+(?!\.\.\/)([^\/]+)\/+\.\.\//, '/' );
      next = next.replace ( /(^|\/)([^\/]+)\/+\.(?=\/|$)/, '$1$2' );
      next = next.replace ( /(^|\/)\.\//, '$1' );
      next = next.replace ( /(^|\/)\.(?=\/|$)/, '$1' );

      if ( next === path ) break;

      path = next;

    }

    return path || fallback;

  },

  parse: ( path: string ): PathObject => {

    const re = /^((\/?)(?:.*(?=\/+[^\/]))?)\/?((\.?(?:.+(?=\.)|\.(?=\/|$)|[^\.\/]*))((?:\.[^\/]*)?))\/*$/;
    const match = re.exec ( path ) || NO_MATCH;
    const [, dir, root, base, name, ext] = match;

    return { root, dir, base, name, ext };

  },

  relative: ( from: string, to: string ): string => {

    if ( from === to ) return '';

    from = Posix.resolve ( from );
    to = Posix.resolve ( to );

    if ( from === to ) return '';

    const froms = from.replace ( /\/$/, '' ).split ( '/' );
    const tos = to.replace ( /\/$/, '' ).split ( '/' );

    let fi = 0;
    let ti = 0;
    let fl = froms.length;
    let tl = tos.length;

    while ( fi < fl && ti < tl ) {

      if ( froms[fi] !== tos[ti] ) break;

      fi += 1;
      ti += 1;

    }

    const parents = new Array ( fl - fi ).fill ( '..' );
    const children = tos.slice ( ti );
    const paths = parents.concat ( children );
    const path = paths.join ( '/' );

    return path;

  },

  resolve: ( ...paths: string[] ): string => {

    if ( !paths.length ) return '.';

    let filtered = paths.filter ( Boolean );

    if ( !filtered.length ) return getCwdPosix ();

    const lastAbsoluteIndex = findLastIndex ( filtered, Posix.isAbsolute );

    if ( lastAbsoluteIndex > 0 ) {

      filtered = filtered.slice ( lastAbsoluteIndex );

    }

    if ( !Posix.isAbsolute ( filtered[0] ) ) {

      filtered.splice ( 0, 0, getCwdPosix () );

    }

    const path = filtered.join ( '/' ).replace ( /(.)\/+$/, '$1' );

    return Posix.normalize ( path );

  },

  toNamespacedPath: ( path: string ): string => {

    return path;

  }

};

/* EXPORT */

export default Posix;
