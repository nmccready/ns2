/**
 *  ns2
 *
 * @version: 0.0.0
 * @author: Nicholas McCready
 * @date: Thu Jul 17 2014 18:23:18 GMT-0400 (EDT)
 * @license: MIT
 */
/*
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)
    author: Nick McCready
 */

(function() {
  var isNode;

  getGlobal().namespace = function(names, fn) {
    var space, _name;
    if (fn == null) {
      fn = function() {};
    }
    if (typeof names === 'string') {
      names = names.split('.');
    }
    space = this[_name = names.shift()] || (this[_name] = {});
    space.namespace || (space.namespace = this.namespace);
    if (names.length) {
      return space.namespace(names, fn);
    } else {
      return fn.call(space);
    }
  };

  isNode = require('isnode');

  if (isNode) {
    module.exports = {
      namespace: namespace,
      BaseObject: BaseObject
    };
  }

}).call(this);
