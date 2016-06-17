# ember-computed-template-string

[![Build Status](https://travis-ci.org/intercom/ember-computed-template-string.svg?branch=master)](https://travis-ci.org/intercom/ember-computed-template-string)

Consider the canonical computed property example:

```js
Ember.Object.extend({
  firstName: null,
  lastName: null,

  fullName: Ember.computed('firstName', 'lastName', function() {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
});
```

`ember-computed-template-string` provides a macro which removes the duplication:

```js
import templateString from 'ember-computed-template-string';

Ember.Object.extend({
  firstName: null,
  lastName: null,

  fullName: templateString("${firstName} ${lastName}")
  })
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
