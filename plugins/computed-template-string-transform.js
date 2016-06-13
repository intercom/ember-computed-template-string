'use strict';

let Parser = require('ember-computed-template-string-parser');
let ComputedTemplateStringTransform = function() {
  return function(babel) {
    let types = babel.types;
    let importedComputedTemplateStringModuleName;

    return new babel.Transformer('simple-transform', {
      ImportDeclaration: function(node, parent, scope, file) {
        if (types.isLiteral(node.source, { value: "ember-computed-template-string" })) {
          let firstNode = node.specifiers && node.specifiers[0];
          if(types.isImportDefaultSpecifier(firstNode)) {
            importedComputedTemplateStringModuleName = firstNode.local.name;
          }
        }
      },
      CallExpression: function(node, parent, scope, file) {
        let isMemberExpression = node.callee.type === 'MemberExpression';
        let isIdentifier = node.callee.type === 'Identifier';
        if(isIdentifier && node.callee.name === importedComputedTemplateStringModuleName) {
          let template = node.arguments[0].value;
          let parser = new Parser(template);
          return this.replaceWithSourceString(parser.toComputedPropertyString());
        }
      }
    });
  }
};
module.exports = ComputedTemplateStringTransform;
