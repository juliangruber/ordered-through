var through = require('through');
var duplex = require('duplexer');
var OrderedEmitter = require('ordered-emitter');

module.exports = orderedThrough;

function orderedThrough (fn) {
  var em = new OrderedEmitter;
  var count = 0;

  var processing = 0;
  em.on('processing',  function () { processing++ });
  em.on('!processing', function () { processing-- });

  // apply fn to `chunk`
  var input = through(function (chunk) {
    em.emit('processing');
    var c = Number(count++);

    fn(chunk, function (err, res) {
      if (err) {
        em.emit('!processing');
        em.emit('error', err);
        return;
      }

      em.emit('chunk', {
        order : c,
        value : res
      });
      em.emit('!processing');
    });
  });

  var output = through(write, end);

  function write (chunk) { this.queue(chunk); }
  function end () {
    if (!processing) return output.queue(null);
    em.on('!processing', function onProcessing () {
      if (processing) return;
      
      em.removeListener('!processing', onProcessing);
      output.queue(null);
    });
  }

  // output ordered chunks
  em.on('chunk', function (chunk) {
    output.write(chunk.value);
  });

  // re-emit errors
  em.on('error', output.emit.bind(output, 'error'));

  // duplex stream with working backpressure
  return duplex(input, input.pipe(output));
}
