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
    this._eachParam((param) => {
      param.setTargetAtTime(target, startTime, timeConstant);
    });
  }

  setValueCurveAtTime(values, startTime, duration) {
    this._eachParam((param) => {
      param.setValueCurveAtTime(values, startTime, duration);
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
