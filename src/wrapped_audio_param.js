'use strict';

export class WrappedAudioParam {
  constructor(referenceIndex, params) {
    this.referenceIndex = referenceIndex;
    this.params = params;
  }

  get defaultValue() {
    return this.params[0][0].defaultValue;
  }

  get value() {
    return this.params[this.referenceIndex][0].value;
  }

  set value(value) {
    this._eachParam((param, mul, add) => {
      param.value = value * mul + add;
    });
  }

  setValueAtTime(value, startTime) {
    this._eachParam((param, mul, add) => {
      param.setValueAtTime(value * mul + add, startTime);
    });
  }

  linearRampToValueAtTime(value, endTime) {
    this._eachParam((param, mul, add) => {
      param.linearRampToValueAtTime(value * mul + add, endTime);
    });
  }

  exponentialRampToValueAtTime(value, endTime) {
    this._eachParam((param, mul, add) => {
      param.exponentialRampToValueAtTime(value * mul + add, endTime);
    });
  }

  setTargetAtTime(target, startTime, timeConstant) {
    this._eachParam((param, mul, add) => {
      param.setTargetAtTime(target * mul + add, startTime, timeConstant);
    });
  }

  setValueCurveAtTime(values, startTime, duration) {
    this._eachParam((param, mul, add) => {
      let v = new Float32Array(values.length);

      for (let i = 0; i < values.length; i ++) {
        v[i] = values[i] * mul + add;
      }

      param.setValueCurveAtTime(v, startTime, duration);
    });
  }

  cancelScheduledValues(when) {
    this._eachParam((param) => {
      param.cancelScheduledValues(when);
    });
  }

  _eachParam(fn) {
    this.params.forEach((param) => {
      fn(param[0], param[1], param[2]);
    });
  }
};

export default WrappedAudioParam;
