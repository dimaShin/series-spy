"use strict";

import angular from 'angular';
import API from 'api';

class RulesList {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.API = $injector.get('API');

    this.rules = this.API.rules.query();
  }
}

export default angular.module('components.list.ctrl', [API])
  .controller('ListController', RulesList)
  .name;

export const controller = 'ListController';
export const controllerAs = 'ListCtrl';
