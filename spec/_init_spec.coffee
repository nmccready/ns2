if isNode
  proj = require './ns2'
  global.should = require 'should'
  global.namespace = proj.namespace
  global.BaseObject = proj.BaseObject

#deps be loaded by the browser or by node
describe 'sanity', ->
  it 'should.js should exist', ->
    throw new Error() unless should
  it 'ns2 is loaded', ->
    throw new Error() if not getGlobal().namespace || not getGlobal().BaseObject