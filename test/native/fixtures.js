
/* MAIN */

const Fixtures = {

  posix: [
    '',
    '/',
    '/foo',
    '/foo/bar',
    '/foo/.',
    '/foo/..',
    '/foo/.bar',
    '/foo/.bar.baz',
    '/foo/bar.baz',
    '/foo/bar.baz.qux',
    '/foobar/baz.qux',
    '/foobar/baz..qux',
    '/foobar/baz..qux.',
    '/foobar/baz..qux..',
    '/foobar/baz.',
    '/foobar/baz..',
    '/foobar/baz...',
    './foo/',
    '../foo',
    '.../foo',
    '../../foo',
    '///',
    '/foo///bar',
    '/foo/bar//',
    '/foo/bar///',
    '/foo/bar////',
    '///foo/bar////baz',
    '/path/to/..ext',
    '../',
    '///..//./foo/.//bar',
    'bar/foo../..',
    '../../../foo/../../../bar',
    'foo/..'
  ],

  win32: [
    '',
    '\\',
    '\\foo',
    '\\foo\\bar',
    '\\foo\\.',
    '\\foo\\..',
    '\\foo\\.bar',
    '\\foo\\.bar.baz',
    '\\foo\\bar.baz',
    '\\foo\\bar.baz.qux',
    '\\foobar\\baz.qux',
    '\\foobar\\baz..qux',
    '\\foobar\\baz..qux.',
    '\\foobar\\baz..qux..',
    '\\foobar\\baz.',
    '\\foobar\\baz..',
    '\\foobar\\baz...',
    '.\\foo\\',
    '..\\foo',
    '...\\foo',
    '..\\..\\foo',
    '\\\\\\',
    '\\foo\\\\\\bar',
    '\\foo\\bar\\\\',
    '\\foo\\bar\\\\\\',
    '\\foo\\bar\\\\\\\\',
    '\\\\\\foo\\bar\\\\\\\\baz',
    '\\path\\to\\..ext',
    '..\\',
    '\\\\\\..\\\\.\\foo\\.\\\\bar',
    'bar\\foo..\\..',
    '..\\..\\..\\foo\\..\\..\\..\\bar',
    'foo/..',
    '\\\\?\\Foo\\bar.txt'
  ]

};

/* EXPORT */

export default Fixtures;
