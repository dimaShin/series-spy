import ng from 'angular';
import _ from 'lodash';
//import restangular from 'restangular';
//console.log('rest:', restangular);
class User {
  constructor (Restangular, $window) {
    "ngInject";
    this.tokenStorage = $window.localStorage;
    Restangular.setBaseUrl('/api');
    this.rest = Restangular;
  }

  _getByToken(token) {
    "use strict";
    return this._user = this.rest.one('user-by-token', token);
  }

  signIn(authData) {
    "use strict";

  }

  signUp(authData) {
    "use strict";

  }

  resolve() {
    if (this._user) {
      return this._user;
    }
    const token = this.tokenStorage.getItem('x-token');
    return this._getByToken(token);
  }

}

export default ng.module('app.helpers.user', [  ])
  .service('user', User)
  .name;