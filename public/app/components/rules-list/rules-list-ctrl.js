"use strict";

import angular from 'angular';
import API from 'api';
import RuleDialog from 'rule-dialog/rule-dialog';

class RulesList {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.API = $injector.get('API');
    this.$mdDialog = $injector.get('$mdDialog');
    this.$complile = $injector.get('$compile');
    this.$rootScope = $injector.get('$rootScope');

    this.rules = this.API.rules.query();
  }

  addRule ($event) {

    //const template = this.$complile('<rule-dialog />')(this.$rootScope)[0];
    //console.log(template);

    this.$mdDialog.show({
      template: '<rule-dialog />',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:true,
      focusOnOpen: false
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  }
}

export default angular.module('components.list.ctrl', [
  API,
  RuleDialog
])
  .controller('ListController', RulesList)
  .name;

export const controller = 'ListController';
export const controllerAs = 'ListCtrl';
