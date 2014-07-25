var getGlobal;

getGlobal = function() {
  if (isNode) {
    return global;
  } else {
    return window;
  }
};
