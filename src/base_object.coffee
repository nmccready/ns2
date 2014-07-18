baseObjectKeywords = ['extended', 'included']

getGlobal().BaseObject = class BaseObject
  @extend: (obj) ->
    Object.keys(obj).forEach (key) =>
      unless baseObjectKeywords[key]
        @[key] = obj[key]
    obj.extended?.apply(0)
    @
  @include: (obj) ->
    Object.keys(obj).forEach (key) =>
      unless baseObjectKeywords[key]
        @prototype[key] = obj[key]
        obj.included?.apply(0)
    @