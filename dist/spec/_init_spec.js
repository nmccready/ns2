var BaseObject, namespace, proj, should, _;

if (isNode) {
  proj = require('./ns2');
  should = require('should');
  namespace = proj.namespace;
  BaseObject = proj.BaseObject;
  _ = require('lodash');
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
    if (!namespace || !BaseObject) {
      throw new Error();
    }
  });
});
