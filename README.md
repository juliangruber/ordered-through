
# ordered-through

Through stream that applies async functions to chunks and emits them in order,
no matter how long each operation takes.

## Usage

```js
var through = require('ordered-through');

var ordered = through(function (chunk, cb) {
  // some async function
  setTimeout(function () {
    // emit transformed data
    cb(null, 'Chunk: ' + chunk);
  }, Math.random() * 100);
});

ordered.on('data', console.log);

for (var i = 0; i < 10; i++) ordered.write(i);
ordered.end();
```

## API

### OrderedThrough(fn)

Returns a through stream.

Calls `fn` with every chunk that gets written to it and a callback function
that you need to call with `err` and `chunk` for every chunk you transformed.

## Installation

With [npm](http://npmjs.org) do

```bash
$ npm install ordered-through
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
