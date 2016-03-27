import angular from 'angular';
import api from './user-api';

class UserModel{
  constructor(userApi, $q) {
    'ngInject';
    this.$q = $q;
    this.api = userApi;
  }
  
  get() {
    return this.user;
  }

  signin() {
    if (!this.api.providerService.isLocal()) {
      return this.api.get().then(user => {
        this.user = user;
      });
    }

    return this.$q(resolve => {
      this.api.get().then(user => {
        this.user = user;
        return resolve(user);
      }).catch(() => {
        this.api.create({ authorised: false })
          .then(user => {
            this.user = user;
            resolve.user();
          });
      })
    });
  }
}

export default angular.module('app.models.user', [api])
  .service('user', UserModel)
  .name;
