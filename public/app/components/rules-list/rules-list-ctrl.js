"use strict";

import angular from 'angular';
import API from 'api';
import RuleDialog from 'rule-dialog/rule-dialog';

class RulesList {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.API = $injector.get('API');
    this.$mdDialog = $injector.get('$mdDialog');
    this.$mdToast = $injector.get('$compile');
    this.$rootScope = $injector.get('$rootScope');

    this.rules = this.API.rules.query();
    this.parsing = {
      status: false,
      result: []
    }
  }

  addRule ($event) {

    this.$mdDialog.show({
      template: '<rule-dialog />',
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose:true,
      focusOnOpen: false
    })
    .then(response => {
      this.rules.push(response);
    });
  }

  startParsing () {
    const promise = this.API.parse();
    this.parsing.status = 'IN_PROGRESS';
    promise.then(response => {
      this.parsing.status = false;

      if (response.status === 'OK') {
        this.parsing.result = response.parseResult;
        this.parsing.status = 'READY';
        return;
      }
      this.parsing.status = 'WAITING_SOCKET';
    });

    promise.catch(err => {
      this.parsing.status = false;
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(err.data)
          .position('right top')
          .parent(window.body)
          .hideDelay(5000)
      );
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
