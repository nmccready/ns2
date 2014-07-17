isNode = require 'isnode'

if isNode
  proj = require './ns2'
  global.should = require 'should'
  global.namespace = proj.namespace
  global.BaseObject = proj.BaseObject

#deps be loaded by the browser or by node
throw new Error 'should' unless should
throw new Error 'ns2 undefined' unless proj

console.log proj
