/**
 *  ns2
 *
 * @version: 1.0.1
 * @author: Nicholas McCready
 * @date: Sat Jul 26 2014 09:50:11 GMT-0400 (EDT)
 * @license: MIT
 */
isNode =
  !(typeof window !== "undefined" && window !== null);


var BaseObject, getGlobal, namespace, proj, should, _;

if (isNode) {
  proj = require('./ns2');
  should = require('should');
  namespace = proj.namespace;
  BaseObject = proj.BaseObject;
  getGlobal = proj.getGlobal;
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

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('BaseObject', function() {
  beforeEach(function() {
    var Person, PersonAttributes, PersonModule;
    this.subject = BaseObject;
    PersonModule = {
      changePersonName: function(person, name) {
        person.name = name;
        return person;
      },
      killPersonsName: function(person) {
        delete person.name;
        return person;
      }
    };
    PersonAttributes = {
      p_name: 'no_name',
      state: 'no_state'
    };
    this.PersonAttributes = PersonAttributes;
    Person = (function(_super) {
      __extends(Person, _super);

      Person.include(PersonModule);

      Person.extend(PersonAttributes);

      function Person(name, state) {
        this.name = name != null ? name : Person.p_name;
        this.state = state != null ? state : Person.state;
      }

      return Person;

    })(BaseObject);
    this.name = 'nick';
    this.state = 'fl';
    this.defaultUsage = new Person();
    return this.usage = new Person(this.name, this.state);
  });
  it('exists ~ you loaded the script!', function() {
    return this.subject.should.be.ok;
  });
  describe('include specs', function() {
    it('defaults attributes exist', function() {
      this.defaultUsage.name.should.be.ok;
      return this.defaultUsage.state.should.be.ok;
    });
    it('defaults attributes are correct', function() {
      this.defaultUsage.name.should.be.eql(this.PersonAttributes.p_name);
      return this.defaultUsage.state.should.be.eql(this.PersonAttributes.state);
    });
    return it('override args - usage attributes are correct ', function() {
      this.usage.name.should.be.eql(this.name);
      return this.usage.state.should.be.eql(this.state);
    });
  });
  return describe('extend specs', function() {
    it('defaults functions exist', function() {
      var _ref, _ref1;
      if ((_ref = this.defaultUsage.changePersonName) != null) {
        _ref.should.be.ok;
      }
      return (_ref1 = this.defaultUsage.killPersonsName) != null ? _ref1.should.be.ok : void 0;
    });
    return it('subject functions act correctly', function() {
      var p, p2, _ref;
      p = this.defaultUsage.changePersonName(_.clone(this.defaultUsage), 'john');
      p2 = this.defaultUsage.killPersonsName(this.defaultUsage);
      p.should.be.ok;
      p2.should.be.ok;
      p.name.should.be.eql('john');
      return (_ref = p2.name) != null ? _ref.should.not : void 0;
    });
  });
});

describe('namespace creation tests', function() {
  beforeEach(function() {
    return namespace('test', function() {
      var hidden;
      hidden = 10;
      return this.open = hidden;
    });
  });
  afterEach(function() {
    var test;
    return test = void 0;
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
