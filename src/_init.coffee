isNode = require 'isnode'

getGlobal = ->
  if isNode then global else window

#put into global scope
_global = getGlobal()
_global.getGlobal = getGlobal

if isNode
  _global._ = require 'lodash'

#deps be loaded by the browser or by node
throw new Error 'lodash or underscore undefined' unless _

