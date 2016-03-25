import angular from 'angular';
import _ from 'lodash';

export default class LocalStorageProvider {
  constructor($window, $q) {
    'ngInject';
    this.storage = $window.localStorage;
    this.$q = $q;
  }

  get(item, filter) {
    return this.$q((resolve, reject) => {
      let collection = this.storage.getItem(item);
      
      if (!collection) {
        return reject(collection);
      }

      return resolve(_.filter(collection, filter || {}));
    })
  }

  create(item, value) {

    if (!value._id) {
      value._id = Math.ceil(Math.random() * 10e7);
    }

    return this.$q(resolve => {
      let data = this.storage.setItem(item, value);
      return resolve(data);
    });
  }

  save = this.create;

  delete(item) {
    return this.$q((resolve, reject) => {
      let data = this.storage.getItem(item);

      if (!data) {
        return reject(data);
      }

      this.storage.removeItem(item);

      return resolve(data);
    });
  }
}

export default angular.module('app.providers.local', [])
  .service('localStorageProvider', LocalStorageProvider)
  .name;
