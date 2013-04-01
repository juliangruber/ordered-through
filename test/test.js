var test = require('tap').test;
var ordered = require('..');

test('ordered', function (t) {
  t.plan(10);

  var stream = ordered(function (i, cb) {
    setTimeout(function () {
      cb(null, i);
    }, Math.random() * 100);
  });

  var i = 0;
  stream.on('data', function (_i) {
    t.equal(_i, i++);
  });

  for (var j = 0; j < 10; j++) {
    stream.write(j);
  }
});

test('error', function (t) {
  ordered(function (val, cb) { cb(new Error('foo')) })
    .on('data', function () {
      t.ok(false, 'should not be called');
    })
    .on('error', function (err) {
      t.ok(err, 'error emitted');
      t.end();
    })
    .write('foo');
});
