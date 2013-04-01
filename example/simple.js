var OrderedThrough = require('..');

var ordered = OrderedThrough(function (chunk, cb) {
  setTimeout(function () {
    cb(null, 'Chunk: ' + chunk);
  }, Math.random() * 100);
});

ordered.on('data', console.log);

for (var i = 0; i < 10; i++) ordered.write(i);
ordered.end();
