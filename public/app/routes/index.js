import angular from 'angular';

import auth from './auth';

export default angular.module('app.routes', [ auth ])
  .config(function ($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/signin');
  })
  .name;