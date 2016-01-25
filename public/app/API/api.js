import angular from 'angular';
import ngResource from 'angular-resource';

angular.module('API', [ngResource])
  .factory('API', ApiService);

ApiService.$inject = ['$injector'];
function ApiService ($injector) {
  "use strict";

  const $resource = $injector.get('$resource');

  return {
    rules: $resource('http://127.0.0.1:8081/api/rules/:_id', {_id: '@_id'}, {
      put: {
        method: 'put'
      }
    })
  }
}

export default 'API';

