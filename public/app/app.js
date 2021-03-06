import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';

import './styles/custom-bootstrap.less';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.css'

import config from './config/';
import models from './models/';
import components from './components/';
import helpers from './helpers/';
import run from './run';

angular.module('app', [
  ngRoute,
  ngAnimate,
  helpers,
  models,
  components,
  config,
  run
]);