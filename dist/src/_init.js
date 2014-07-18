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
