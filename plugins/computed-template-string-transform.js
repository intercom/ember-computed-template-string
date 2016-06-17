'use strict';
let Parser = require('ember-computed-template-string-parser');

let ComputedTemplateStringTransform = function(options) {
  let configuredReplaceCallPaths = options.replaceCallPaths || [];

  return function(babel) {
    let types = babel.types;
    let importedComputedTemplateStringModuleName; //`computedTemplateString` from `import computedTemplateString from 'ember-computed-template-string';`

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
        let isIdentifier = node.callee.type === 'Identifier';
        let isImportedTemplateString = isIdentifier && node.callee.name === importedComputedTemplateStringModuleName;

        let isConfiguredCallPath = false;
        if(node.callee.type === 'MemberExpression') {
          let callPath = getCallPath(node.callee);
          isConfiguredCallPath = configuredReplaceCallPaths.indexOf(callPath) > -1;
        }

        if(isImportedTemplateString || isConfiguredCallPath) {
          let template = node.arguments[0].value;
          let parser = new Parser(template);
          return this.replaceWithSourceString(parser.toComputedPropertyString());
        }
      }
    });
  }
};

function getCallPath(node) {
  let leftSide = '';
  if(node.object.type === 'Identifier') {
    leftSide = node.object.name;
  } else {
    if(node.object.type === 'MemberExpression') {
      leftSide = getCallPath(node.object);
    };
  }

  return `${leftSide}.${node.property.name}`;
}

module.exports = ComputedTemplateStringTransform;
