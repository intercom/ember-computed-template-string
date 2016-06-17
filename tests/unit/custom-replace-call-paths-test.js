import Em from 'ember';
import { module, test } from 'qunit';
import computedTemplateString from 'ember-computed-template-string';

//these are configured in `ember-cli-build.js`
let Computed = { templateString: computedTemplateString };
let Nested = { Computed: Computed };

module("Computed template string with `replaceCallPaths` configuration");

var Person = Em.Object.extend({
  name: 'Ben',
  greeting1: Computed.templateString('Hi ${name}'),
  greeting2: Nested.Computed.templateString('Hello ${name}')
});

test('A simple template', function(assert) {
  var person = Person.create({ name: 'Ben' });
  assert.equal(person.get('greeting1'), 'Hi Ben');
  assert.equal(person.get('greeting2'), 'Hello Ben');

  person.setProperties({ name: 'Alex' });
  assert.equal(person.get('greeting1'), 'Hi Alex');
  assert.equal(person.get('greeting2'), 'Hello Alex');
});
