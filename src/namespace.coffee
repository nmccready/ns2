###
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)
    author: Nick McCready
###
getGlobal().namespace = (names, fn = ()->) ->
  names = names.split '.' if typeof names is 'string'
  space = @[names.shift()] ||= {}
  space.namespace ||= @namespace
  if names.length
    space.namespace names, fn
  else
    fn.call space

isNode = require 'isnode'
if isNode
  module.exports =
    namespace: namespace
    BaseObject: BaseObject