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
    this.$timout = $injector.get('$timeout');

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
    const promise = this.API.parse(this.rules);
    this.parsing.status = 'IN_PROGRESS';

    promise.then(response => {
      if (response.data.status === 'OK') {
        this.parsing.result = response.data.result;
        this.parsing.status = false;
        return;
      }
      this.parsing.status = 'WAITING_SOCKET';

      this.$timout(() => {
        this.parsing.status = false;
        const toast = this.$mdToast.simple()
        .textContent('Parsing too long. Closing it.')
        .position('right top')
        .parent(window.body)
        .theme('error-toast')
        .hideDelay(5000);

      this.$mdToast.show(toast);
      }, 6000);
    });

    promise.catch(err => {

      this.parsing.status = false;
      const toast = this.$mdToast.simple()
        .textContent(err.data)
        .position('right top')
        .parent(window.body)
        .theme('error-toast')
        .hideDelay(5000);

      this.$mdToast.show(toast);

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
