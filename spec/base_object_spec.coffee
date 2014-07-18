describe 'BaseObject', ->
  beforeEach ->
    @subject = BaseObject
#    console.log "BaseObject: #{BaseObject}"

    PersonModule =
      changePersonName: (person, name) ->
        person.name = name
        person
      killPersonsName: (person) ->
        delete person.name
        person

    PersonAttributes =
      p_name: 'no_name'
      state: 'no_state'

    @PersonAttributes = PersonAttributes
    class Person extends BaseObject
      @include PersonModule
      @extend PersonAttributes
      constructor: (name, state) ->
        @name = if name? then name else Person.p_name
        @state = if state? then state else Person.state

    @name = 'nick'
    @state = 'fl'
    @defaultUsage = new Person()
    @usage = new Person(@name, @state)

  it 'exists ~ you loaded the script!', ->
    @subject.should.be.ok

  describe 'include specs', ->
    it 'defaults attributes exist', ->
      @defaultUsage.name.should.be.ok
      @defaultUsage.state.should.be.ok

    it 'defaults attributes are correct', ->
      @defaultUsage.name.should.be.eql @PersonAttributes.p_name
      @defaultUsage.state.should.be.eql @PersonAttributes.state

    it 'override args - usage attributes are correct ', ->
      @usage.name.should.be.eql(@name)
      @usage.state.should.be.eql(@state)

  describe 'extend specs', ->
    it 'defaults functions exist', ->
      @defaultUsage.changePersonName?.should.be.ok
      @defaultUsage.killPersonsName?.should.be.ok

    it 'subject functions act correctly', ->
      p = @defaultUsage.changePersonName(_.clone(@defaultUsage), 'john')
      p2 = @defaultUsage.killPersonsName(@defaultUsage)
      p.should.be.ok
      p2.should.be.ok
      p.name.should.be.eql 'john'
      p2.name?.should.not
