import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';

import config from './config';
import components from './components';

angular.module('app', [
  ngRoute,
  ngAnimate,
  config,
  components
]);