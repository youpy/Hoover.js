'use strict';

var hoover = new Hoover(new AudioContext());

hoover.frequency.value = 293.6647679174076;
hoover.connect(hoover.context.destination);
hoover.start();

window.addEventListener('mousemove', function(e) {
  hoover.frequency.exponentialRampToValueAtTime(
    100 + (300 * (1.0 - (e.pageY / window.innerHeight))),
    hoover.context.currentTime + 0.2
  );
});
