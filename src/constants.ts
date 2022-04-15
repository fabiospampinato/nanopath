
/* MAIN */

const FALLBACK_MATCH = ['', '', '', '', ''];

const PROCESS = globalThis.process || {};

const IS_WINDOWS = ( PROCESS.platform === 'win32' );

/* EXPORT */

export {FALLBACK_MATCH, IS_WINDOWS, PROCESS};
