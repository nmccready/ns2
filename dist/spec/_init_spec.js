/**
 *  ns2
 *
 * @version: 0.0.0
 * @author: Nicholas McCready
 * @date: Thu Jul 17 2014 18:24:27 GMT-0400 (EDT)
 * @license: MIT
 */(function() {
  var isNode, proj;

  isNode = require('isnode');

  if (isNode) {
    proj = require('./ns2');
    global.should = require('should');
    global.namespace = proj.namespace;
    global.BaseObject = proj.BaseObject;
  }

  if (!should) {
    throw new Error('should');
  }

  if (!proj) {
    throw new Error('ns2 undefined');
  }

  console.log(proj);

}).call(this);
