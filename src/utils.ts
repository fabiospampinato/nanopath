
/* IMPORT */

import {IS_WINDOWS, PROCESS} from './constants';

/* MAIN */

const findLastIndex = <T> ( arr: ArrayLike<T>, iterator: ( value: T, index: number, arr: ArrayLike<T> ) => boolean ): number => {

  for ( let i = arr.length - 1; i >= 0; i-- ) {

    if ( iterator ( arr[i], i, arr ) ) return i;

  }

  return -1;

};

const getCwd = (): string => {

  return PROCESS.cwd?.() || '/';

};

const getCwdPosix = (): string => {

  if ( !IS_WINDOWS ) return getCwd ();

  const path = getCwd ().replace ( /\\/g, '/' );

  return path.slice ( path.indexOf ( '/' ) );

};

const getEnv = ( key: string ): string | undefined => {

  return PROCESS.env?.[key];

};

/* EXPORT */

export {findLastIndex, getCwd, getCwdPosix, getEnv};
