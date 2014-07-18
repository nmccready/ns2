(function() {
  var proj;

  if (isNode) {
    proj = require('./ns2');
    global.should = require('should');
    global.namespace = proj.namespace;
    global.BaseObject = proj.BaseObject;
  }

  describe('sanity', function() {
    it('should.js should exist', function() {
      if (!should) {
        throw new Error();
      }
    });
    return it('ns2 is loaded', function() {
      if (!getGlobal().namespace || !getGlobal().BaseObject) {
        throw new Error();
      }
    });
  });

}).call(this);
