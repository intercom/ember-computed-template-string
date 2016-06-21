import Em from 'ember';
import computedTemplateString from 'ember-computed-template-string';

export default Em.Controller.extend({
  firstName: 'foo',
  lastName: 'bar',
  age: 2,
  socialAccounts: {
    twitter: '@foo'
  },
  baz: {foo: 'BLAMMO', bar: 'BLAZORZ'},

  fullName: Em.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' +  this.get('lastName');
  }),
  fullName2: computedTemplateString("${firstName} ${lastName}"),
  multiName: computedTemplateString("Hi ${firstName}, Goodbye Mr ${lastName}"),
  nestedName: computedTemplateString("Twitter Handle is ${socialAccounts.twitter}")
});
