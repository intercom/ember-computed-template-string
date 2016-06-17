import Em from 'ember';
import computedTemplateString from 'ember-computed-template-string';
import { module, test } from 'qunit';

module("Computed template string with an import");

var Person = Em.Object.extend({
  name: 'Alex',
  age: 2,
  config: {
    path: '/home'
  },
  greeting: computedTemplateString('Hello ${name}, you are ${age} years old'),
  nested: computedTemplateString('the path is ${config.path}, ok?'),
  multi: computedTemplateString('hi ${name}, bye ${name}'),
  withSingleQuote: computedTemplateString("Single quote in literal: ' and in property: ${name}"),
  withDoubleQuote: computedTemplateString('Double quote in literal: " and in property: ${name}'),
});

test('A template with two properties', function(assert) {
  var person = Person.create({ name: 'Alex', age: 2 });
  assert.equal(person.get('greeting'), 'Hello Alex, you are 2 years old');

  person.setProperties({ name: 'Ben', age: 1 });
  assert.equal(person.get('greeting'), 'Hello Ben, you are 1 years old');
});

test('A template with a nested property', function(assert) {
  var person = Person.create();
  assert.equal(person.get('nested'), 'the path is /home, ok?');

  person.set('config.path', '/garden');
  assert.equal(person.get('nested'), 'the path is /garden, ok?');
});

test('A template with a key used multiple times', function(assert) {
  var person = Person.create({ name: 'Ben' });
  assert.equal(person.get('multi'), 'hi Ben, bye Ben');

  person.set('name', 'Sarah');
  assert.equal(person.get('multi'), 'hi Sarah, bye Sarah');
});

test('A template with a single quote', function(assert) {
  var person = Person.create({ name: 'Ben' });
  assert.equal(person.get('withSingleQuote'), "Single quote in literal: ' and in property: Ben");
  person.set('name', "Mr O'Shea");
  assert.equal(person.get('withSingleQuote'), "Single quote in literal: ' and in property: Mr O'Shea");
});

test('A template with a double quote', function(assert) {
  var person = Person.create({ name: 'Ben' });
  assert.equal(person.get('withDoubleQuote'), 'Double quote in literal: " and in property: Ben');
  person.set('name', 'Mr O"Shea');
  assert.equal(person.get('withDoubleQuote'), 'Double quote in literal: " and in property: Mr O"Shea');
});
