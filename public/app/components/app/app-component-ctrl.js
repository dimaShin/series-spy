import angular from 'angular';
import API from './../../API/api';

angular.module('components.app.ctrl', [API])
  .controller('AppController', AppCtrl);

AppCtrl.$inject = ['API'];
function AppCtrl (API) {
  "use strict";

  this.rules = API.rules.query();
}

export default 'components.app.ctrl';
export const controller = 'AppController';
export const controllerAs = 'AppCtrl';
