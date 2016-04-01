import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import 'angular-easyfb';

import './styles/custom-bootstrap.less';
import './styles/main.scss';
import 'font-awesome/css/font-awesome.css'

import config from './config/';
import routes from './routes/';
import models from './models/';
import components from './components/';
import helpers from './helpers/';
import run from './run';

angular.module('app', [
  'ezfb',
  ngRoute,
  ngAnimate,
  routes,
  helpers,
  models,
  components,
  config,
  run
]);