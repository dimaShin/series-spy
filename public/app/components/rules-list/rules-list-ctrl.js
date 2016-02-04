"use strict";

import angular from 'angular';
import API from 'api';
import RuleDialog from 'rule-dialog/rule-dialog';

class RulesList {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.API = $injector.get('API');
    this.$mdDialog = $injector.get('$mdDialog');
    this.$mdToast = $injector.get('$mdToast');
    this.$rootScope = $injector.get('$rootScope');
    this.$document = $injector.get('$document');
    this.Parser = $injector.get('Parser');

    this.rules = this.API.rules.query();
    this.parsing = {
      status: false,
      result: []
    }
  }

  addRule ($event) {

    this.$mdDialog.show({
      template: '<rule-dialog />',
      parent: angular.element(this.$document.body),
      targetEvent: $event,
      clickOutsideToClose:true,
      focusOnOpen: false
    })
    .then(response => {
      this.rules.push(response);
    });
  }

  startParsing ($event) {
    this.Parser.parse(this.rules)
      .then(result => {
        this.showResults($event, result);
      });
  }

  showResults ($event, results) {
    this.$mdDialog.show({
      template: '<parsing-results results="NoopCtrl.results" />',
      locals: {
        results
      },
      bindToController: true,
      controllerAs: 'NoopCtrl',
      controller: angular.noop,
      parent: angular.element(this.$document.body),
      targetEvent: $event,
      fullscreen: true
    })
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
