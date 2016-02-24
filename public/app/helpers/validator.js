import angular from 'angular';
import is from 'is_js';

class Validator {
  constructor() {

  }

  get(validator) {
    return this[validator]
  }

  required() {
    return value => {
      return !!String(value);
    }
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
  .service('Validator', Validator)
  .name;
