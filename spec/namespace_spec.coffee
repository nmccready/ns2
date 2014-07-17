describe 'namespace creation tests', ->
  beforeEach ->
    namespace 'test', ->
      hidden = 10
      @open = hidden

  afterEach ->
    getGlobal().test = undefined
    delete getGlobal().test

  it 'has no hidden', ->
    test.hidden?.should.not.be.ok

  it 'has open', ->
    test.open.should.be.eql 10

  describe 'depth', ->
    it 'single depth namespace was created', ->
      test.should.be.ok

    it 'double depth namespace was created', ->
      namespace 'test1.test2'
      test1.test2.should.be.ok

    it 'triple depth namespace was created', ->
      namespace 'one.two.three'
      one.two.three.should.be.ok

  describe 'collisions', ->
    it 'should not kill an existing object', ->
      one.two.crap =
        test: ->
          'crap'

      namespace 'one.two.crap', ->
        @subObj = {}

      one.two.crap.test.should.be.ok
      one.two.crap.test().should.be.eql 'crap'
      one.two.crap.subObj.should.be.ok