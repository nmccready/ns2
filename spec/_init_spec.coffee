if isNode
  proj = require './ns2'
  global.should = require 'should'
  global.namespace = proj.namespace
  global.BaseObject = proj.BaseObject
  global._ = require 'lodash'

#deps be loaded by the browser or by node
describe 'sanity', ->
  it 'should.js exist', ->
    throw new Error() unless should

  it 'lodash exists', ->
    throw new Error 'lodash or underscore undefined' unless _

  it 'ns2 is loaded', ->
    throw new Error() if not getGlobal().namespace || not getGlobal().BaseObject