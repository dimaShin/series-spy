import angular from 'angular';
import ngResource from 'angular-resource';

class UserApi {
  constructor(provider, $resource) {
    'ngInject';
    this.providerService = provider;
    this.resourse = $resource('api/auth/user/:_id',
      { _id: '@_id' },
      {
        put   : { method: 'PUT' },
        create: { method: 'POST' },
        signup: { method: 'post', url: 'api/signup' }
      }
    )
  }

  get() {
    let provider = this.providerService.get('user');
    return provider.get('user');
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
    return this.resourse.get( {token: token} );
  }

  signup(user) {
    return this.resourse.signup(user);
  }
}

export default angular.module('app.models.user.api', [ ngResource ])
  .service('userApi', UserApi)
  .name;
