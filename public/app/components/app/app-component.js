require('./app.scss');

import angular from 'angular';
import angularMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import template from './app-component.html';

import AppCtrl, { controller, controllerAs } from './app-component-ctrl';

import RulesList from './../rules-list/rules-list';

export default angular.module('components.app', [
  angularMaterial,
  AppCtrl,
  ngMdIcons,
  RulesList
])
  .directive('appComponent', function () {
    "use strict";

    return {
      restrict: 'E',
      template,
      controller,
      controllerAs
    }

  }).name;