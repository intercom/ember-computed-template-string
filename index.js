/* jshint node: true */
'use strict';

var Parser = require('ember-computed-template-string-parser');
var parser = new Parser('hi ${name}!');

console.log('Computed Property:', parser.toComputedPropertyString());

module.exports = {
  name: 'ember-computed-template-string'
};
