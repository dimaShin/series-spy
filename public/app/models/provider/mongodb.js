import angular from 'angular';

export default class MongodbProvider {
  contructor($resource) {
    this.$resource = $resource;
  }

  get() {

  }

  create() {

  }

  save() {

  }

  delete() {
    
  }
}

export default angular.module('app.providers.mongodb', [])
  .service('mongodbProvider', MongodbProvider)
  .name;
