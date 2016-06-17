# ember-computed-template-string

[![Ember Observer Score](http://emberobserver.com/badges/ember-computed-template-string.svg)](http://emberobserver.com/addons/ember-computed-template-string)

Consider the canonical computed property example:

```js
Ember.Object.extend({
  firstName: 'Serena',
  lastName: 'Fritsch',

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
```

`ember-computed-template-string` provides a macro which removes the duplication:

```js
import templateString from 'ember-computed-template-string';

Ember.Object.extend({
  firstName: 'Serena',
  lastName: 'Fritsch',

  fullName: templateString("${firstName} ${lastName}")
});
```

## Installation

This is an Ember CLI addon, to install:

`ember install ember-computed-template-string`

## Development Instructions

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.
