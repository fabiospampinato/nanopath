
/* IMPORT */

import {IS_WINDOWS} from './constants';
import posix from './posix';
import {PathPlatform} from './types';
import win32 from './win32';

/* MAIN */

const Posix: PathPlatform = {
  ...posix,
  get posix () {
    return Posix;
  },
  get win32 () {
    return Win32;
  }
};

const Win32: PathPlatform = {
  ...win32,
  get posix () {
    return Posix;
  },
  get win32 () {
    return Win32;
  }
};

const Platform: PathPlatform = ( IS_WINDOWS ? Win32 : Posix );

const Path: PathPlatform = Platform;

/* EXPORT */

export default Path;
