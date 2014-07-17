/**
 *  ns2
 *
 * @version: 0.0.0
 * @author: Nicholas McCready
 * @date: Thu Jul 17 2014 18:24:27 GMT-0400 (EDT)
 * @license: MIT
 */(function() {
  describe('namespace creation tests', function() {
    beforeEach(function() {
      return namespace('test', function() {
        var hidden;
        hidden = 10;
        return this.open = hidden;
      });
    });
    afterEach(function() {
      getGlobal().test = void 0;
      return delete getGlobal().test;
    });
    it('has no hidden', function() {
      var _ref;
      return (_ref = test.hidden) != null ? _ref.should.not.be.ok : void 0;
    });
    it('has open', function() {
      return test.open.should.be.eql(10);
    });
    describe('depth', function() {
      it('single depth namespace was created', function() {
        return test.should.be.ok;
      });
      it('double depth namespace was created', function() {
        namespace('test1.test2');
        return test1.test2.should.be.ok;
      });
      return it('triple depth namespace was created', function() {
        namespace('one.two.three');
        return one.two.three.should.be.ok;
      });
    });
    return describe('collisions', function() {
      return it('should not kill an existing object', function() {
        one.two.crap = {
          test: function() {
            return 'crap';
          }
        };
        namespace('one.two.crap', function() {
          return this.subObj = {};
        });
        one.two.crap.test.should.be.ok;
        one.two.crap.test().should.be.eql('crap');
        return one.two.crap.subObj.should.be.ok;
      });
    });
  });

}).call(this);
