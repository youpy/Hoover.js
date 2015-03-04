'use strict';

var neu = neume(new AudioContext());
var _ = neume._;
var mouse = { y: 290 };

// https://github.com/mohayonao/neume.js/wiki/snippet-mouse
window.addEventListener('mousemove', function(e) {
  var y = e.pageY / window.innerHeight;
  mouse.y = _.midicps(_.linlin(y, 0, 1, 72, 48)|0);
});

neu.Synth(Hoover, mouse, { key: "y", curve: "exp", lag: 0.200 }).start();
//neu.Synth(Hoover).start();
