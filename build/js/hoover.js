(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hoover = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Hoover = require('./lib/hoover.js').Hoover;

module.exports = Hoover;

},{"./lib/hoover.js":2}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var WrappedAudioParam = _interopRequire(require("./wrapped_audio_param"));

var DETUNE = 4.87;

var Node = (function () {
  function Node(node, mul, add, amp) {
    _classCallCheck(this, Node);

    this.node = node;
    this.mul = mul;
    this.add = add;
    this.amp = amp;
  }

  _createClass(Node, {
    param: {
      get: function () {
        return [this.node.frequency, this.mul, this.add];
      }
    }
  });

  return Node;
})();

;

var Hoover = exports.Hoover = (function () {
  function Hoover(context) {
    var _this = this;

    _classCallCheck(this, Hoover);

    this._context = context;
    this.nodes = [];

    var presets = [[0.25, 0, 3], [0.5, 0, 0.9], [0.25, 0, 0.6]];

    [[1, 1], [2, 0.4], [3, 0.15], [4, 0.1]].forEach(function (v) {
      [-1, 0, 1].forEach(function (vv) {
        presets.push([v[0], vv * DETUNE, v[1]]);
      });
    });

    presets.forEach(function (preset, i) {
      var osc = context.createOscillator();

      if (i >= 3) {
        var lfo = _this.context.createOscillator();

        lfo.frequency.value = 0.2 + preset[0] * 1.4;
        lfo.connect(osc.frequency);
        lfo.start(0);

        osc.type = "sawtooth";
      } else {
        osc.type = "triangle";
      }

      _this.nodes.push(new Node(osc, preset[0], preset[1], preset[2]));
    });

    this._frequency = new WrappedAudioParam(4, this.nodes.map(function (node) {
      return node.param;
    }));
  }

  _createClass(Hoover, {
    context: {
      get: function () {
        return this._context;
      }
    },
    numberOfInputs: {
      get: function () {
        return 0;
      }
    },
    numberOfOutputs: {
      get: function () {
        return 1;
      }
    },
    channelCount: {
      get: function () {
        return this.nodes[0].node.channelCount;
      },
      set: function (value) {
        this._eachNode(function (node) {
          node.channelCount = value;
        });
      }
    },
    channelCountMode: {
      get: function () {
        return this.nodes[0].node.channelCountMode;
      },
      set: function (value) {
        this._eachNode(function (node) {
          node.channelCountMode = value;
        });
      }
    },
    channelInterpretation: {
      get: function () {
        return this.nodes[0].node.channelInterpretation;
      },
      set: function (value) {
        this._eachNode(function (node) {
          node.channelInterpretation = value;
        });
      }
    },
    connect: {
      value: function connect(audioNode) {
        var _this = this;

        this._eachNode(function (node, amp) {
          var gain = _this.context.createGain();

          gain.gain.value = amp * 0.15;
          node.connect(gain);
          gain.connect(audioNode);
        });
      }
    },
    disconnect: {
      value: function disconnect() {
        this._eachNode(function (node) {
          node.disconnect();
        });
      }
    },
    type: {
      get: function () {
        return "hoover";
      },
      set: function (value) {
        return;
      }
    },
    frequency: {
      get: function () {
        return this._frequency;
      }
    },
    detune: {
      get: function () {
        return this.nodes[0].node.detune;
      }
    },
    start: {
      value: function start() {
        var when = arguments[0] === undefined ? 0 : arguments[0];

        var freq = this.frequency.value;

        this.frequency.value = 0.000001;
        this.frequency.setValueAtTime(0.000001, when);
        this.frequency.exponentialRampToValueAtTime(freq * 1.4, when + 0.5);
        this.frequency.exponentialRampToValueAtTime(freq, when + 1.2);
        this._eachNode(function (node) {
          node.start(when);
        });
      }
    },
    stop: {
      value: function stop() {
        var when = arguments[0] === undefined ? 0 : arguments[0];

        this._eachNode(function (node) {
          node.stop(when);
        });
      }
    },
    _eachNode: {
      value: function _eachNode(fn) {
        this.nodes.forEach(function (node) {
          fn(node.node, node.amp);
        });
      }
    }
  });

  return Hoover;
})();

;

exports["default"] = Hoover;
},{"./wrapped_audio_param":3}],3:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var WrappedAudioParam = exports.WrappedAudioParam = (function () {
  function WrappedAudioParam(referenceIndex, params) {
    _classCallCheck(this, WrappedAudioParam);

    this.referenceIndex = referenceIndex;
    this.params = params;
  }

  _createClass(WrappedAudioParam, {
    defaultValue: {
      get: function () {
        return this.params[0][0].defaultValue;
      }
    },
    value: {
      get: function () {
        return this.params[this.referenceIndex][0].value;
      },
      set: function (value) {
        this._eachParam(function (param, mul, add) {
          param.value = value * mul + add;
        });
      }
    },
    setValueAtTime: {
      value: function setValueAtTime(value, startTime) {
        this._eachParam(function (param, mul, add) {
          param.setValueAtTime(value * mul + add, startTime);
        });
      }
    },
    linearRampToValueAtTime: {
      value: function linearRampToValueAtTime(value, endTime) {
        this._eachParam(function (param, mul, add) {
          param.linearRampToValueAtTime(value * mul + add, endTime);
        });
      }
    },
    exponentialRampToValueAtTime: {
      value: function exponentialRampToValueAtTime(value, endTime) {
        this._eachParam(function (param, mul, add) {
          param.exponentialRampToValueAtTime(value * mul + add, endTime);
        });
      }
    },
    setTargetAtTime: {
      value: function setTargetAtTime(target, startTime, timeConstant) {
        this._eachParam(function (param, mul, add) {
          param.setTargetAtTime(target * mul + add, startTime, timeConstant);
        });
      }
    },
    setValueCurveAtTime: {
      value: function setValueCurveAtTime(values, startTime, duration) {
        this._eachParam(function (param, mul, add) {
          var v = new Float32Array(values.length);

          for (var i = 0; i < values.length; i++) {
            v[i] = values[i] * mul + add;
          }

          param.setValueCurveAtTime(v, startTime, duration);
        });
      }
    },
    cancelScheduledValues: {
      value: function cancelScheduledValues(when) {
        this._eachParam(function (param) {
          param.cancelScheduledValues(when);
        });
      }
    },
    _eachParam: {
      value: function _eachParam(fn) {
        this.params.forEach(function (param) {
          fn(param[0], param[1], param[2]);
        });
      }
    }
  });

  return WrappedAudioParam;
})();

;

exports["default"] = WrappedAudioParam;
},{}]},{},[1])(1)
});