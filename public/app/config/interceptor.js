import angular from 'angular';

export default angular.module('app.config.interceptor', [])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function($q, $window) {
      'ngInject';
      return {
        'request': function(config) {

          let token = $window.localStorage.getItem('xx-token');

          if (token) {
            config.token = token;
          }

          return config;
        },

        'response': function(response) {
          if (response.token) {
            $window.localStorage.setItem('xx-token', response.token);
          }

          return response.data || response;
        }
      };
    });
  }]).name;
