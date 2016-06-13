import Em from 'ember';
import computedTemplateString from 'ember-computed-template-string';

export default Em.Controller.extend({
  firstName: 'foo',
  lastName: 'bar',
  fullName: Em.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' +  this.get('lastName');
  }),
  fullName2: computedTemplateString("${firstName} ${lastName}")
});
