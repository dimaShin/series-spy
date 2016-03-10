import angular from 'angular';
import is from 'is_js';

class Validator {
  constructor() {

  }

  _matchAll(cases) {
    for( let i = 0; i < cases.length; i++) {
      if (!cases[i]) {
        return false;
      }
    }
    return true;
  }

  get(validator) {
    return this[validator].bind(this);
  }

  required() {
    return value => {
      return !is.empty(value);
    };
  }

  password() {
    return value => {
      return true;
    }
  }

  email() {
    return value => {
      if (!value) {
        return true;
      }
      return is.email(value);
    }
  }
}

export default angular.module('app.helpers.validator', [])
  .service('validator', Validator)
  .name;
