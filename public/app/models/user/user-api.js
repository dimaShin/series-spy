import angular from 'angular';
import ngResource from 'angular-resource';

class UserApi {
  constructor(provider, $resource) {
    'ngInject';
    this.providerService = provider;
    this.resourse = $resource('api/private/user/:_id',
      { _id: '@_id' },
      {
        save  : { method: 'PUT' },
        create: { method: 'POST' },
        signup: { method: 'post', url: 'api/signup' }
      }
    )
  }

  get(query) {
    if (query) {
      return this.resourse.get(query).$promise;
    }

    return this.resourse.query().$promise;
  }

  create(user) {
    let provider = this.providerService.get();
    return provider.create('user', user);
  }

  save(user) {
    let provider = this.providerService.get();
    return provider.save('user', user);
  }

  getByToken(token) {
    return this.resourse.get().$promise;
  }

  signup(user) {
    return this.resourse.signup(user);
  }
}

export default angular.module('app.models.user.api', [ ngResource ])
  .service('userApi', UserApi)
  .name;
