# NanoPath

A tiny isomorphic port of Node@17.8.0 path module.

This library relies on TypeScript's type system for checking the validity of arguments.

## Install

```sh
npm install --save nanopath
```

## Usage

It works just like Node's path module.

```ts
import path from 'nanopath'; // Implementation depending on the current platform
import posix from 'nanopath/posix'; // Implementation for POSIX paths
import win32 from 'nanopath/win32'; // Implementation for Windows paths
import web from 'nanopath/web'; // Alias for "nanopath/posix"

path.posix === posix // => true
path.win32 === win32 // => true

posix.posix // => undefined
posix.win32 // => undefined

win32.posix // => undefined
win32.win32 // => undefined

web.posix // => undefined
web.win32 // => undefined
```

## License

- Library (Parts): MIT © Fabio Spampinato
- Library (Parts): © [Node.js](https://github.com/nodejs/node/blob/master/LICENSE)
- Test suite (Parts): © [Node.js](https://github.com/nodejs/node/blob/master/LICENSE)
