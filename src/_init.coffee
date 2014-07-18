getGlobal = ->
  if isNode then global else window

#put into global scope
_global = getGlobal()
_global.getGlobal = getGlobal
_global.isNode = isNode