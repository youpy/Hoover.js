(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hoover = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Hoover = require('./lib/hoover.js');

module.exports = Hoover;

},{"./lib/hoover.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hoover = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bundledOscillator = require('@youpy/bundled-oscillator');

var _bundledOscillator2 = _interopRequireDefault(_bundledOscillator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DETUNE = 4.87;

var Hoover = exports.Hoover = function (_BundledOscillator) {
  _inherits(Hoover, _BundledOscillator);

  function Hoover(context) {
    _classCallCheck(this, Hoover);

    var config = [];
    var presets = [[0.25, 0, 3.0], [0.5, 0, 0.9], [0.25, 0, 0.6]];

    [[1.0, 1.0], [2.0, 0.4], [3.0, 0.15], [4.0, 0.10]].forEach(function (v) {
      [-1, 0, 1].forEach(function (vv) {
        presets.push([v[0], vv * DETUNE, v[1]]);
      });
    });

    presets.forEach(function (preset, i) {
      var osc = context.createOscillator();

      if (i >= 3) {
        var lfo = context.createOscillator();

        lfo.frequency.value = 0.2 + preset[0] * 1.4;
        lfo.connect(osc.frequency);
        lfo.start(0);

        osc.type = 'sawtooth';
      } else {
        osc.type = 'triangle';
      }

      config.push([osc, preset[0], preset[1], preset[2] * 0.15]);
    });

    return _possibleConstructorReturn(this, (Hoover.__proto__ || Object.getPrototypeOf(Hoover)).call(this, context, config, 4));
  }

  _createClass(Hoover, [{
    key: 'start',
    value: function start() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var freq = this.frequency.value;

      this.frequency.value = 1e-6;
      this.frequency.setValueAtTime(1e-6, when);
      this.frequency.exponentialRampToValueAtTime(freq * 1.4, when + 0.5);
      this.frequency.exponentialRampToValueAtTime(freq, when + 1.2);

      _get(Hoover.prototype.__proto__ || Object.getPrototypeOf(Hoover.prototype), 'start', this).call(this, when);
    }
  }, {
    key: 'type',
    get: function get() {
      return 'hoover';
    }
  }]);

  return Hoover;
}(_bundledOscillator2.default);

;

exports.default = Hoover;
},{"@youpy/bundled-oscillator":3}],3:[function(require,module,exports){
'use strict';

var BundledOscillator = require('./lib/bundled_oscillator.js');

module.exports = BundledOscillator;

},{"./lib/bundled_oscillator.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wrapped_audio_param = require('./wrapped_audio_param');

var _wrapped_audio_param2 = _interopRequireDefault(_wrapped_audio_param);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(node, mul, add, amp) {
    _classCallCheck(this, Node);

    this.node = node;
    this.mul = mul;
    this.add = add;
    this.amp = amp;
  }

  _createClass(Node, [{
    key: 'param',
    get: function get() {
      return [this.node.frequency, this.mul, this.add];
    }
  }]);

  return Node;
}();

;

var BundledOscillator = function () {
  function BundledOscillator(context, config, referenceIndex) {
    var _this = this;

    _classCallCheck(this, BundledOscillator);

    this._context = context;
    this.nodes = [];

    config.forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 4),
          osc = _ref2[0],
          mul = _ref2[1],
          add = _ref2[2],
          amp = _ref2[3];

      _this.nodes.push(new Node(osc, mul, add, amp));
    });

    this._frequency = new _wrapped_audio_param2.default(referenceIndex, this.nodes.map(function (node) {
      return node.param;
    }));
  }

  _createClass(BundledOscillator, [{
    key: 'connect',
    value: function connect(audioNode) {
      var _this2 = this;

      this._eachNode(function (node, amp) {
        var gain = _this2.context.createGain();

        gain.gain.value = amp;
        node.connect(gain);
        gain.connect(audioNode);
      });
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      this._eachNode(function (node) {
        node.disconnect();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._eachNode(function (node) {
        node.start(when);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this._eachNode(function (node) {
        node.stop(when);
      });
    }
  }, {
    key: '_eachNode',
    value: function _eachNode(fn) {
      this.nodes.forEach(function (node) {
        fn(node.node, node.amp);
      });
    }
  }, {
    key: 'context',
    get: function get() {
      return this._context;
    }
  }, {
    key: 'numberOfInputs',
    get: function get() {
      return 0;
    }
  }, {
    key: 'numberOfOutputs',
    get: function get() {
      return 1;
    }
  }, {
    key: 'channelCount',
    get: function get() {
      return this.nodes[0].node.channelCount;
    },
    set: function set(value) {
      this._eachNode(function (node) {
        node.channelCount = value;
      });
    }
  }, {
    key: 'channelCountMode',
    get: function get() {
      return this.nodes[0].node.channelCountMode;
    },
    set: function set(value) {
      this._eachNode(function (node) {
        node.channelCountMode = value;
      });
    }
  }, {
    key: 'channelInterpretation',
    get: function get() {
      return this.nodes[0].node.channelInterpretation;
    },
    set: function set(value) {
      this._eachNode(function (node) {
        node.channelInterpretation = value;
      });
    }
  }, {
    key: 'type',
    get: function get() {
      return 'bundled-oscillator';
    },
    set: function set(value) {
      return;
    }
  }, {
    key: 'frequency',
    get: function get() {
      return this._frequency;
    }
  }, {
    key: 'detune',
    get: function get() {
      return this.nodes[0].node.detune;
    }
  }, {
    key: 'onended',
    get: function get() {
      return this.nodes[0].node.onended;
    },
    set: function set(fn) {
      this.nodes[0].node.onended = fn;
    }
  }]);

  return BundledOscillator;
}();

exports.default = BundledOscillator;
;
},{"./wrapped_audio_param":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WrappedAudioParam = exports.WrappedAudioParam = function () {
  function WrappedAudioParam(referenceIndex, params) {
    _classCallCheck(this, WrappedAudioParam);

    this.referenceIndex = referenceIndex;
    this.params = params;
  }

  _createClass(WrappedAudioParam, [{
    key: 'setValueAtTime',
    value: function setValueAtTime(value, startTime) {
      this._eachParam(function (param, mul, add) {
        param.setValueAtTime(value * mul + add, startTime);
      });
    }
  }, {
    key: 'linearRampToValueAtTime',
    value: function linearRampToValueAtTime(value, endTime) {
      this._eachParam(function (param, mul, add) {
        param.linearRampToValueAtTime(value * mul + add, endTime);
      });
    }
  }, {
    key: 'exponentialRampToValueAtTime',
    value: function exponentialRampToValueAtTime(value, endTime) {
      this._eachParam(function (param, mul, add) {
        param.exponentialRampToValueAtTime(value * mul + add, endTime);
      });
    }
  }, {
    key: 'setTargetAtTime',
    value: function setTargetAtTime(target, startTime, timeConstant) {
      this._eachParam(function (param, mul, add) {
        param.setTargetAtTime(target * mul + add, startTime, timeConstant);
      });
    }
  }, {
    key: 'setValueCurveAtTime',
    value: function setValueCurveAtTime(values, startTime, duration) {
      this._eachParam(function (param, mul, add) {
        var v = new Float32Array(values.length);

        for (var i = 0; i < values.length; i++) {
          v[i] = values[i] * mul + add;
        }

        param.setValueCurveAtTime(v, startTime, duration);
      });
    }
  }, {
    key: 'cancelScheduledValues',
    value: function cancelScheduledValues(when) {
      this._eachParam(function (param) {
        param.cancelScheduledValues(when);
      });
    }
  }, {
    key: '_eachParam',
    value: function _eachParam(fn) {
      this.params.forEach(function (param) {
        fn(param[0], param[1], param[2]);
      });
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      return this.params[0][0].defaultValue;
    }
  }, {
    key: 'value',
    get: function get() {
      return this.params[this.referenceIndex][0].value;
    },
    set: function set(value) {
      this._eachParam(function (param, mul, add) {
        param.value = value * mul + add;
      });
    }
  }]);

  return WrappedAudioParam;
}();

;

exports.default = WrappedAudioParam;
},{}]},{},[1])(1)
});