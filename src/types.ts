
/* MAIN */

type PathObject = {
  root: string,
  dir: string,
  base: string,
  name: string,
  ext: string
};

type PathPlatform = {
  delimiter: string,
  sep: string,
  posix: PathPlatform,
  win32: PathPlatform,
  basename ( path: string, ext?: string ): string,
  dirname ( path: string ): string,
  extname ( path: string ): string,
  format ( path: PathObject ): string,
  isAbsolute ( path: string ): boolean,
  join ( ...paths: string[] ): string,
  normalize ( path: string ): string,
  parse ( path: string ): PathObject,
  relative ( from: string, to: string ): string,
  resolve ( ...paths: string[] ): string,
  toNamespacedPath ( path: string ): string
};

/* EXPORT */

export type {PathObject, PathPlatform};
