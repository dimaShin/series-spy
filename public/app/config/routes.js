import angular from 'angular';
import ngRouter from 'angular-route';

RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

function RoutesConfig ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    template: '<app-component />'
  });

}

angular.module('config.routes', [ngRouter])
  .config(RoutesConfig);


export default 'config.routes';
