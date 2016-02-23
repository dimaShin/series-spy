import ng from 'angular';
import router from 'angular-router';

export default ng.module('app.config.router', [ router ])
  .config(($routeProvider, $locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $routeProvider.otherwise('/');

    $routeProvider.when('/', {
      template: '<home user="$resolve.user"></home>',
      resolve: {
        user: ['user', user => user.resolve()]
      }
    });

    $routeProvider.when('/rules', {
      template: '<rules rules="$resolve.rules"></rules>',
      resolve: {
        users: ['user', user => user.getRules()]
      }
    });

    $route.when('/signin', {
      template: '<signin></signin>'
    });

    $route.when('/signup', {
      template: '<signup></signup>'
    });
  })
