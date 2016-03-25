import angular from 'angular';
import api from './user-api';

class UserModel{
  constructor(userApi, $q) {
    'ngInject';
    this.$q = $q;
    this.api = userApi;
  }
  
  get() {
    if (!this.user) {
      return this.api.get(arguments)
    }
    
    return this.$q(resolve => {
      return this.user;
    })
  }
}

export default angular.module('app.models.user', [api])
  .service('user', UserModel)
  .name;
