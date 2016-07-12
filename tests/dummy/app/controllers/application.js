import Em from 'ember';
import computedTemplateString from 'ember-computed-template-string';

export default Em.Controller.extend({
  firstName: 'Peter',
  lastName: 'Sellers',

  fullName: Em.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  greeting: Em.computed('fullName', function() {
    return `Hi ${this.get('fullName')}, welcome to Ember!`;
  }),

  fullName2: computedTemplateString('${firstName} ${lastName}'),
  greeting2: computedTemplateString("Hi ${fullName}, welcome to Ember!")
});
