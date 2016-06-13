/* jshint node: true */
'use strict';

var ComputedTemplateStringTransform = require('./plugins/computed-template-string-transform');

module.exports = {
  name: 'ember-computed-template-string',
  included: function(app) {
    this._super.included(...arguments);
    app.options = app.options || {};
    app.options.babel = app.options.babel || {};
    app.options.babel.plugins = app.options.babel.plugins || [];

    if (!this._registeredWithBabel) {
      app.options.babel.plugins.push(ComputedTemplateStringTransform());
      this._registeredWithBabel = true;
    }
  }

};
