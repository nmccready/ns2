/**
 *  ns2
 *
 * @version: 1.0.0
 * @author: Nicholas McCready
 * @date: Fri Jul 18 2014 10:35:14 GMT-0400 (EDT)
 * @license: MIT
 */
isNode =
  !(typeof window !== "undefined" && window !== null);


(function() {
  var getGlobal, _global;

  getGlobal = function() {
    if (isNode) {
      return global;
    } else {
      return window;
    }
  };

  _global = getGlobal();

  _global.getGlobal = getGlobal;

  _global.isNode = isNode;

}).call(this);

(function() {
  var BaseObject, baseObjectKeywords,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  baseObjectKeywords = ['extended', 'included'];

  getGlobal().BaseObject = BaseObject = (function() {
    function BaseObject() {}

    BaseObject.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(baseObjectKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(0);
      }
      return this;
    };

    BaseObject.include = function(obj) {
      var key, value, _ref, _results;
      _results = [];
      for (key in obj) {
        value = obj[key];
        if (!(__indexOf.call(baseObjectKeywords, key) < 0)) {
          continue;
        }
        this.prototype[key] = value;
        if ((_ref = obj.included) != null) {
          _ref.apply(0);
        }
        _results.push(this);
      }
      return _results;
    };

    return BaseObject;

  })();

}).call(this);


/*
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)
    author: Nick McCready
 */

(function() {
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

  if (isNode) {
    module.exports = {
      namespace: namespace,
      BaseObject: BaseObject
    };
  }

}).call(this);
