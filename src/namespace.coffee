###
    Created to make namespaces safely without stomping and crushing other namespaces and or objects
    (taken/modified from stack overflow)

    Recursive walk the namespaces and create objects underneath each if it is undefined
    author: Nick McCready
###
namespace = (names, fn = ()->) ->
  names = names.split '.' if typeof names is 'string'
  space = @[names.shift()] ||= {}
  space.namespace ||= @namespace
  if names.length
    space.namespace names, fn
  else
    fn.call space

if isNode
  module.exports =
    namespace: namespace
    BaseObject: BaseObject
else
  _global = getGlobal()
  _global.namespace = namespace
  _global.BaseObject = BaseObject
