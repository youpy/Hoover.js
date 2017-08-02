'use strict';

import BundledOscillator from '@youpy/bundled-oscillator';

const DETUNE = 4.87;

export class Hoover extends BundledOscillator {
  constructor(context) {
    const config = [];
    const presets = [
      [0.25, 0, 3.0],
      [0.5, 0, 0.9],
      [0.25, 0, 0.6]
    ];

    [
      [1.0, 1.0],
      [2.0, 0.4],
      [3.0, 0.15],
      [4.0, 0.10]
    ].forEach((v) => {
      [-1, 0, 1].forEach((vv) => {
        presets.push([v[0], vv * DETUNE, v[1]]);
      });
    });

    presets.forEach((preset, i) => {
      let osc = context.createOscillator();

      if(i >= 3) {
        let lfo = context.createOscillator();

        lfo.frequency.value = 0.2 + (preset[0] * 1.4);
        lfo.connect(osc.frequency);
        lfo.start(0);

        osc.type = 'sawtooth';
      } else {
        osc.type = 'triangle';
      }

      config.push([
        osc,
        preset[0],
        preset[1],
        preset[2] * 0.15
      ]);
    });

    super(context, config, 4);
  }

  get type() {
    return 'hoover';
  }

  start(when = 0) {
    let freq = this.frequency.value;

    this.frequency.value = 1e-6;
    this.frequency.setValueAtTime(1e-6, when);
    this.frequency.exponentialRampToValueAtTime(freq * 1.4, when + 0.5);
    this.frequency.exponentialRampToValueAtTime(freq, when + 1.2);

    super.start(when);
  }
};

export default Hoover;
