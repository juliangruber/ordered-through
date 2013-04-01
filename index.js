var through = require('through');
var duplex = require('duplexer');
var OrderedEmitter = require('ordered-emitter');

module.exports = orderedThrough;

function orderedThrough (fn) {
  var em = new OrderedEmitter;
  var count = 0;

  // apply fn to `chunk`
  var input = through(function (chunk) {
    var c = Number(count++);

    fn(chunk, function (err, res) {
      if (err) return em.emit('error', err);

      em.emit('chunk', {
        order : c,
        value : res
      });
    });
  });

  var output = through();

  // output ordered chunks
  em.on('chunk', function (chunk) {
    output.write(chunk.value);
  });

  // re-emit errors
  em.on('error', output.emit.bind(output, 'error'));

  // duplex stream with working backpressure
  return duplex(input, input.pipe(output));
}
