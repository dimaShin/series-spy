import ng from 'angular';
import router from 'angular-route';

export default ng.module('app.config.router', [ router ])
  .config(($routeProvider, $locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $routeProvider.otherwise('/');

    $routeProvider.when('/', {
      template: '<spy-home></spy-home>',
      resolve: {
        user: ['user', user => {
          "use strict";
          return user.resolve();
        }]
      }
    });
  }).name;
