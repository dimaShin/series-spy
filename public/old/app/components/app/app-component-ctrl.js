"use strict";

import angular from 'angular';

class AppCtrl {
  static $inject = ['$injector'];

  constructor ($injector) {

  }
}

angular.module('components.app.ctrl', [])
  .controller('AppController', AppCtrl);

export default 'components.app.ctrl';
export const controller = 'AppController';
export const controllerAs = 'AppCtrl';