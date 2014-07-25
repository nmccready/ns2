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
