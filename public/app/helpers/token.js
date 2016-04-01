import angular from 'angular';

class Token {
  constructor($window) {
    'ngInject';
    this.storage = $window.localStorage;
    this.tokenKey = 'xx-token';
  }
  
  get() {
    return this.storage.getItem(this.tokenKey);
  }
  
  set(token) {
    return this.storage.setItem(this.tokenKey, token);
  }
  
  remove() {
    return this.storage.removeItem(this.tokenKey);
  }
}

export default angular.module('app.helpers.token', []).service('token', Token).name;
