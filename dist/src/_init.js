/**
 *  ns2
 *
 * @version: 0.0.0
 * @author: Nicholas McCready
 * @date: Thu Jul 17 2014 18:23:18 GMT-0400 (EDT)
 * @license: MIT
 */(function() {
  var getGlobal, isNode, _global;

  isNode = require('isnode');

  getGlobal = function() {
    if (isNode) {
      return global;
    } else {
      return window;
    }
  };

  _global = getGlobal();

  _global.getGlobal = getGlobal;

  if (isNode) {
    _global._ = require('lodash');
  }

  if (!_) {
    throw new Error('lodash or underscore undefined');
  }

}).call(this);
