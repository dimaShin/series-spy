import angular from 'angular';

import localStorageProvider from './localstorage';
import mongodbProvider from './mongodb';

class Provider {
  constructor(localStorageProvider, mongodbProvider) {
    'ngInject';
    this.providers = {
      local: localStorageProvider,
      remote: mongodbProvider
    };

    this.activeProvider = null;
  }

  set(provider) {
    if (!this.providers[provider]) {
      throw `Unknown provider ${provider}`;
    }

    this.activeProvider = this.providers[provider];
  }

  get() {
    if (!this.activeProvider) {
      throw 'There is no active provider yet';
    }

    return this.activeProvider;
  }
}


export default angular
  .module('app.providers.provider', [ localStorageProvider, mongodbProvider ])
  .service('provider', Provider)
  .name;