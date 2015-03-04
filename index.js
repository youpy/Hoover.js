'use strict';

var Hoover = require('./lib/hoover.js');

if (typeof window !== "undefined") {
  window.Hoover = Hoover;
}

module.exports = Hoover;

