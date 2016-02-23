import ng from 'angular';
import _ from 'lodash';
import restangular from 'restangular';

class User {
  constructor (Restangular, $window) {
    "ngInject";
    this.tokenStorage = $window.localStorage;
    Restangular.setBaseUrl('/api');
    this.rest = Restangular;
  }

  getByToken(token) {
    "use strict";
    return this._user = this.rest.one('user', token);
  }

  signin(authData) {
    "use strict";

  }

  signup(authData) {
    "use strict";

  }

  resolve() {
    if (this._user) {
      return this._user;
    }
    const token = this.tokenStorage.getItem('x-token');
    return this.getByToken(token);
  }

  getRu

}

export default ng.module('app.helpers.user', [ restangular ])
  .service('user', User)
  .name;