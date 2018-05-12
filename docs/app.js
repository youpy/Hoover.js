'use strict';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var button = document.querySelector('button');
button.addEventListener('click', function() {
  var hoover = new Hoover.Hoover(new AudioContext());

  hoover.frequency.value = 293.6647679174076;
  hoover.connect(hoover.context.destination);

  hoover.start();

  function bend(y) {
    hoover.frequency.exponentialRampToValueAtTime(
      130 + (400 * (1.0 - (y / window.innerHeight))),
      hoover.context.currentTime + 0.2
    );
  }

  window.addEventListener('mousemove', function(e) {
    bend(e.pageY);
  });

  window.addEventListener('touchmove', function(e) {
    bend(e.touches[0].pageY);
  });
})
