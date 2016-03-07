import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';

import './custom-bootstrap.less';
import 'font-awesome/css/font-awesome.css'

import config from './config/';
import components from './components/';
import helpers from './helpers/';

angular.module('app', [
  ngRoute,
  ngAnimate,
  config,
  components,
  helpers
]);