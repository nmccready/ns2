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

  if (isNode) {
    _global._ = require('lodash');
  }

  if (!_) {
    throw new Error('lodash or underscore undefined');
  }

}).call(this);
