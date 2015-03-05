'use strict';

var neu = neume(new AudioContext());

function Hoover($, obj, options) {
  var detune = 4.87;

  if (typeof options === 'undefined') {
    obj = '@freq';
  }

  if (typeof options === 'undefined') {
    options = { value: 293.7 };
  }

  var freq = $(obj, options);

  var bass = [
    [0.25, 1.0],
    [0.5, 0.3],
    [0.75, 0.2]
  ].map(function(x) {
    return [freq.mul(x[0]), x[1] * 3.0];
  });

  var midfreqs = [
    [1.0, 1.0],
    [2.0, 0.4],
    [3.0, 0.15],
    [4.0, 0.10]
  ].reduce(function(memo, x) {
    return memo.concat([-1, 0, 1].map(function(xx) {
      return [freq.mul(x[0]).add(detune * xx), x[1]];
    }));
  }, []);

  return $(
    bass.map(function(x) {
      return $('tri', {
        freq: $('adsr', {
          curve: 'exp',
          attackTime: 0.5,
          decayTime: 0.7,
          sustainLevel: 0.714,
          mul: 1.0
        }, x[0].mul(1.4)),
        mul: x[1]
      });
    }).concat(midfreqs.map(function(x) {
      return $('saw', {
        freq: $('adsr', {
          curve: 'exp',
          attackTime: 0.5,
          decayTime: 0.7,
          sustainLevel:
          0.714,
          mul: 1.0
        }, $('sin', { freq: 0.1 }).mul(2).add(x[0].mul(1.4))),
        mul: x[1]
      });
    }))
  ).mul(0.15);
}

module.exports = Hoover;
