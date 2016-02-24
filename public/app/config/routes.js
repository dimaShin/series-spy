import ng from 'angular';
import router from 'angular-route';

export default ng.module('app.config.router', [ router ])
  .config(($routeProvider, $locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $routeProvider.otherwise('/signin');

    $routeProvider.when('/signin', {
      template: '<sign-in></sign-in>'
    });

    $routeProvider.when('/signup', {
      template: '<sign-up></sign-up>'
    });
  }).name;
