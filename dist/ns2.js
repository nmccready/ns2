/**
 *  ns2
 *
 * @version: 1.0.2
 * @author: Nicholas McCready
 * @date: Mon Sep 08 2014 14:03:56 GMT-0400 (EDT)
 * @license: MIT
 */
isNode =
  !(typeof window !== "undefined" && window !== null);


var getGlobal;

getGlobal = function() {
  if (isNode) {
    return global;
  } else {
    return window;
  }
};

var BaseObject, baseObjectKeywords;

baseObjectKeywords = ['extended', 'included'];

BaseObject = BaseObject = (function() {
  function BaseObject() {}

  BaseObject.extend = function(obj) {
    var _ref;
    Object.keys(obj).forEach((function(_this) {
      return function(key) {
        if (!baseObjectKeywords[key]) {
          return _this[key] = obj[key];
        }
      };
    })(this));
    if ((_ref = obj.extended) != null) {
      _ref.apply(0);
    }
    return this;
  };

  BaseObject.include = function(obj) {
    Object.keys(obj).forEach((function(_this) {
      return function(key) {
        var _ref;
        if (!baseObjectKeywords[key]) {
          _this.prototype[key] = obj[key];
          return (_ref = obj.included) != null ? _ref.apply(0) : void 0;
        }
      };
    })(this));
    return this;
  };

  return BaseObject;

})();


/*
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)

    Recursive walk the namespaces and create objects underneath each if it is undefined
    author: Nick McCready
 */
var namespace, _global;

namespace = function(names, fn) {
  var space, _name;
  if (fn == null) {
    fn = function() {};
  }
  if (typeof names === 'string') {
    names = names.split('.');
  }
  space = this[_name = names.shift()] || (this[_name] = {});
  space.namespace || (space.namespace = namespace);
  if (names.length) {
    return space.namespace(names, fn);
  } else {
    return fn.call(space);
  }
};

if (isNode) {
  module.exports = {
    namespace: namespace,
    BaseObject: BaseObject,
    getGlobal: getGlobal
  };
} else {
  _global = getGlobal();
  _global.namespace = namespace;
  _global.BaseObject = BaseObject;
}
