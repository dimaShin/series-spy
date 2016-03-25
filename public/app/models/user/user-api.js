import angular from 'angular';
import provider from 'models/provider';

class UserApi {
  constructor(provider) {
    'ngInject';
    this.providerService = provider;
  }

  get() {
    let provider = this.providerService.get();
    return provider.get('user');
  }
}

export default angular.module('app.models.user.api', [ provider ])
  .service('userApi', UserApi)
  .name;
