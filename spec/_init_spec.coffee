if isNode
  proj = require './ns2'
  should = require 'should'
  namespace = proj.namespace
  BaseObject = proj.BaseObject
  getGlobal = proj.getGlobal
  _ = require 'lodash'

#deps be loaded by the browser or by node
describe 'sanity', ->
  it 'should.js exist', ->
    throw new Error() unless should

  it 'lodash exists', ->
    throw new Error 'lodash or underscore undefined' unless _

  it 'ns2 is loaded', ->
    throw new Error() if not namespace || not BaseObject