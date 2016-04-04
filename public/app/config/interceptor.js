import angular from 'angular';

export default angular.module('app.config.interceptor', [])
  .config(['$httpProvider', function ($httpProvider) {

    const TOKEN_KEY = 'xx-token';

    $httpProvider.interceptors.push(function($q, $window) {
      'ngInject';
      return {
        'request': function(config) {
          console.log(config);
          let token = $window.localStorage.getItem(TOKEN_KEY);

          if (token) {
            config.headers[TOKEN_KEY] = token;
          }

          return config;
        },

        'response': function(response) {
          let token = response.headers(TOKEN_KEY);
          console.log(`token: ${token}`);
          if (token) {
            $window.localStorage.setItem(TOKEN_KEY, token);
          }

          return response;
        }
      };
    });
  }]).name;
