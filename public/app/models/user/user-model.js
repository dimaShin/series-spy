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

  save() {
    return this.api.save(this.user);
  }

  getRules() {
    return this.user.shows;
  }

  signin() {
    return this.$q((resolve, reject) => {
      this.api.get().then(user => {
        this.user = user;
        return resolve(user);
      }).catch(err => {
        if (this.api.providerService.isLocal()) {
          return this.api.create({ authorised: false, shows: [], jobs: [] })
            .then(user => {
              this.user = user;
              resolve(user);
            });
        }
        reject(err);
      })
    });
  }
  
  signup(user) {
    this.providerService.set('remote');
    this.api.create('user', user)
  }
}

export default angular.module('app.models.user', [api])
  .service('user', UserModel)
  .name;
