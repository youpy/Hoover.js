'use strict';

var neu = neume();
var _ = neume._;
var mouse = { y: 293.7 };

function setMouseY(y) {
  mouse.y = _.midicps(_.linlin(y, 0, 1, 60, 72) | 0);
}

// https://github.com/mohayonao/neume.js/wiki/snippet-mouse
window.addEventListener('mousemove', function(e) {
  var y = e.pageY / window.innerHeight;
  setMouseY(y);
});

window.addEventListener('touchmove', function(e) {
  var y = e.touches[0].pageY / window.innerHeight;
  setMouseY(y);
});

function start() {
  neu.stop();
  neu.Synth(Hoover, mouse, { key: 'y', curve: 'exp', lag: 0.200 }).
    start('now');
  //neu.Synth(Hoover).start('now');
}

function stop() {
  neu.stop();
}

document.getElementById('start-button').onclick = start;
document.getElementById('stop-button').onclick = stop;
