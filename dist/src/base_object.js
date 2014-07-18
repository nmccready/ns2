(function() {
  var BaseObject, baseObjectKeywords;

  baseObjectKeywords = ['extended', 'included'];

  getGlobal().BaseObject = BaseObject = (function() {
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

}).call(this);
