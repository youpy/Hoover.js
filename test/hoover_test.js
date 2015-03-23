'use strict';

import assert from 'power-assert';
import Hoover from '../lib/hoover.js';

describe('Hoover', () => {
  let hoover;
  let context;

  beforeEach(() => {
    context = new AudioContext();
    hoover = new Hoover(context);
  });

  describe('AudioNode properties', () => {
    it("#context", () => {
      assert(hoover.context == context);
    });

    it("#numberOfInputs", () => {
      assert(hoover.numberOfInputs == 0);
    });

    it("#numberOfOutputs", () => {
      assert(hoover.numberOfOutputs == 1);
    });

    it("#channelCount", () => {
      assert(hoover.channelCount == 2);
    });

    it("#channelCount=", () => {
      hoover.channelCount = 3;

      assert(hoover.channelCount == 3);
    });

    it("#channelCountMode", () => {
      assert(hoover.channelCountMode == 'max');
    });

    it("#channelCountMode=", () => {
      hoover.channelCountMode = 'explicit';

      assert(hoover.channelCountMode == 'explicit');
    });

    it("#channelInterpretation", () => {
      assert(hoover.channelInterpretation == 'speakers');
    });

    it("#channelInterpretation=", () => {
      hoover.channelInterpretation = 'discrete';

      assert(hoover.channelInterpretation == 'discrete');
    });
  });

  describe('AudioNode methods', () => {
    it('#connect(AudioNode)', () => {
      let destination = context.destination;
      hoover.connect(destination);

      assert(hoover.channelCount == 2);
    });

    it('#connect(AudioParam)', () => {
      let gainNode = context.createGain();
      hoover.connect(gainNode.gain);

      assert(hoover.channelCount == 2);
    });

    it('#disconnect()', () => {
      hoover.disconnect();
    });
  });

  describe('OscillatorNode properties', () => {
    it('#frequency', () => {
      assert(hoover.frequency.constructor.name == 'WrappedAudioParam');
      assert(hoover.frequency.value == 440);

      hoover.frequency.value = 200;

      assert(hoover.frequency.value == 200);
    });

    it('#detune', () => {
      assert(hoover.detune.constructor.name == 'AudioParam');
      assert(hoover.detune.value == 0);
    });

    it('#type', () => {
      assert(hoover.type == 'hoover');
    });

    it('#type=', () => {
      assert(hoover.type == 'hoover');
    });
  });

  describe('OscillatorNode methods', () => {
    it('#start()', () => {
      hoover.start();
    });

    it('#start(when)', () => {
      hoover.start(123);
    });

    it('#stop()', () => {
      hoover.start();
      hoover.stop();
    });

    it('#stop(when)', () => {
      hoover.start();
      hoover.stop(123);
    });
  });
});
