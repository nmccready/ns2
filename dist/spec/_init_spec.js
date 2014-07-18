(function() {
  var proj;

  if (isNode) {
    proj = require('./ns2');
    global.should = require('should');
    global.namespace = proj.namespace;
    global.BaseObject = proj.BaseObject;
    global._ = require('lodash');
  }

  describe('sanity', function() {
    it('should.js exist', function() {
      if (!should) {
        throw new Error();
      }
    });
    it('lodash exists', function() {
      if (!_) {
        throw new Error('lodash or underscore undefined');
      }
    });
    return it('ns2 is loaded', function() {
      if (!getGlobal().namespace || !getGlobal().BaseObject) {
        throw new Error();
      }
    });
  });

}).call(this);
