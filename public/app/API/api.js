import angular from 'angular';
import ngResource from 'angular-resource';

angular.module('API', [ngResource])
  .factory('API', ApiService);

ApiService.$inject = ['$injector'];
function ApiService ($injector) {
  "use strict";

  const $resource = $injector.get('$resource');
  const $http = $injector.get('$http');
  const $q = $injector.get('$q');

  return {
    rules: $resource('http://127.0.0.1:8081/api/rules/:_id', {_id: '@_id'}, {
      put: {
        method: 'put'
      }
    }),
    parse: (rules) => {
      return $http.post('http://127.0.0.1:8081/api/parse', rules);
    }
  }
}

export default 'API';

