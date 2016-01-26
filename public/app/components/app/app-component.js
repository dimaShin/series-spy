require('./app.scss');

import angular from 'angular';
import angularMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import template from './app-component.html';

import AppCtrl, { controller, controllerAs } from './app-component-ctrl';

angular.module('components.app', [
  angularMaterial,
  AppCtrl,
  ngMdIcons
])
  .directive('appComponent', function () {
    "use strict";

    return {
      restrict: 'E',
      template,
      controller,
      controllerAs
    }

  });

export default 'components.app';
