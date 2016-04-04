import angular from 'angular';

import authRoutes from './auth';
import appRoutes from './app';

export default angular.module('app.routes', [ authRoutes, appRoutes ])
  .config(function ($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/signin');
  })
  .name;