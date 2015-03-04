'use strict';

var neu = neume(new AudioContext());

function Hoover($, obj, options) {
  if (typeof options === 'undefined') {
    obj = '@freq';
  }

  if (typeof options === 'undefined') {
    options = { value: 290 };
  }

  var freq = $(obj, options);

  var bass = [0.25, 0.5, 0.25].reduce(function(memo, x) {
    return memo.concat([1, 0.3, 0.2].map(function(xx) {
      return [freq.mul(x), xx];
    }));
  }, []);

  var midfreqs = [-1, 0, 1].map(function(x) {
    return freq.add(3.87 * x);
  });

  return $(
    bass.map(function(x) {
      return $('tri', { freq: x[0], mul: x[1] });
    }).concat(midfreqs.map(function(x) {
      return $('saw', { freq: $('sin', { freq: 0.1 }).mul(2).add(x) });
    }))
  ).mul(0.20);
};

module.exports = Hoover;
