'use strict';

import WrappedAudioParam from './wrapped_audio_param';

const DETUNE = 4.87;

class Node {
  constructor(node, mul, add, amp) {
    this.node = node;
    this.mul = mul;
    this.add = add;
    this.amp = amp;
  }

  get param() {
    return [this.node.frequency, this.mul, this.add];
  }
};

export class Hoover {
  constructor(context) {
    this._context = context;
    this.nodes = [];

    let presets = [
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
        let lfo = this.context.createOscillator();

        lfo.frequency.value = 0.2 + (preset[0] * 1.4);
        lfo.connect(osc.frequency);
        lfo.start();

        osc.type = 'sawtooth';
      } else {
        osc.type = 'triangle';
      }

      this.nodes.push(new Node(osc, preset[0], preset[1], preset[2]));
    });

    this._frequency = new WrappedAudioParam(
      4,
      this.nodes.map((node) => {
        return node.param;
      })
    );
  }

  get context() {
    return this._context;
  }

  get numberOfInputs() {
    return 0;
  }

  get numberOfOutputs() {
    return 1;
  }

  get channelCount() {
    return this.nodes[0].node.channelCount;
  }

  set channelCount(value) {
    this._eachNode((node) => {
      node.channelCount = value;
    });
  }

  get channelCountMode() {
    return this.nodes[0].node.channelCountMode;
  }

  set channelCountMode(value) {
    this._eachNode((node) => {
      node.channelCountMode = value;
    });
  }

  get channelInterpretation() {
    return this.nodes[0].node.channelInterpretation;
  }

  set channelInterpretation(value) {
    this._eachNode((node) => {
      node.channelInterpretation = value;
    });
  }

  connect(audioNode) {
    this._eachNode((node, amp) => {
      let gain = this.context.createGain();

      gain.gain.value = amp * 0.15;
      node.connect(gain);
      gain.connect(audioNode);
    });
  }

  disconnect() {
    this._eachNode((node) => {
      node.disconnect();
    });
  }

  get type() {
    return 'hoover';
  }

  set type(value) {
    return;
  }

  get frequency() {
    return this._frequency;
  }

  get detune() {
    return this.nodes[0].node.detune;
  }

  start(when = 0) {
    let freq = this.frequency.value;

    this.frequency.value = 1e-6;
    this.frequency.setValueAtTime(1e-6, when);
    this.frequency.exponentialRampToValueAtTime(freq * 1.4, when + 0.5);
    this.frequency.exponentialRampToValueAtTime(freq, when + 1.2);
    this._eachNode((node) => {
      node.start(when);
    });
  }

  stop(when = 0) {
    this._eachNode((node) => {
      node.stop(when);
    });
  }

  _eachNode(fn) {
    this.nodes.forEach((node) => {
      fn(node.node, node.amp);
    });
  }
};

export default Hoover;
