import angular from 'angular';
import api from './user-api';

class UserModel{

  constructor(userApi, $q, token, $injector) {
    'ngInject';
    this.$q = $q;
    this.api = userApi;
    this.token = token;
    this.localStorage = $injector.get('$window').localStorage;
  }

  getUserId() {
    return this.localStorage.getItem('xx-user-id');
  }

  resolve() {

    return this.$q((resolve, reject) => {
      let token = this.token.get();
      let userId = this.getUserId();


      if (this.user) {
        return resolve(this.user);
      }

      if (!token || !userId) {
        this.user = null;
        return resolve(null);
      }

      this.api.get({ _id: userId })
        .then(user => {
          this.user = user;
          return resolve(user);
        })
        .catch(err => {
          return reject(err);
        });
    })

  }

  get() {
    return this.user;
  }

  save() {
    return this.user.$save().$promise;
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
    let promise = this.api.signup(user).$promise;
    promise.then(user => {
      this.user = user;
    });
    return promise;
  }
}

export default angular.module('app.models.user', [api])
  .service('user', UserModel)
  .name;
