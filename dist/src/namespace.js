
/*
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)

    Recursive walk the namespaces and create objects underneath each if it is undefined
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
