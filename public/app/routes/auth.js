import angular from 'angular';
import ngRoute from 'angular-ui-router';

function authRouteConfig ($stateProvider) {
  'ngInject';
  $stateProvider.state('signIn', {
    url: '/signin',
    template: '<sign-in></sign-in>'
  });
}



export default angular.module('app.routes.auth', [ ngRoute ])
  .config(authRouteConfig)
  .name;
