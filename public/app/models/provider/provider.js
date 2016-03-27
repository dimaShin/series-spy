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
      return this._getDefaultProvider();
    }

    return this.activeProvider;
  }

  _getDefaultProvider() {
    return this.providers.local;
  }

  isLocal() {
    return this.activeProvider === 'local';
  }
}


export default angular
  .module('app.providers.provider',
    [ localStorageProvider, mongodbProvider ])
  .service('provider', Provider)
  .name;