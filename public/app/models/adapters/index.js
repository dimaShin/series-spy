import angular from 'angular';

import localStorageAdapter from './localstorage';
import mongodbAdapter from './mongodb';

export default angular.module('app.models.adapters', [])
  .service('localStorageAdapter', localStorageAdapter)
  .service('mongodbAdapter', mongodbAdapter)
  .name;
