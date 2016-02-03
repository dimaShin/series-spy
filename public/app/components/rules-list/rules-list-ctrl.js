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
    this.$document = $injector.get('$document');
    this.$location = $injector.get('$location');

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

  _waitForSocketConnection (ws, cb, interval) {
    if (!angular.isDefined(interval)) {
      interval = 1000;
    }
    if (ws.readyState === 1) {
      return cb();
    }

    setTimeout(() => {
      this._waitForSocketConnection(ws, cb, interval);
    }, interval)
  }

  startParsing ($event) {
    //const promise = this.API.parse(this.rules);
    this.parsing.status = 'IN_PROGRESS';
    const host = this.$location.absUrl().replace(/^http/, 'ws');
    const ws = new WebSocket(host);
    this._waitForSocketConnection(ws, () => {
      ws.send(angular.toJson(this.rules), { binary: true, mask: true });
      const interval = setInterval(()=> {
        ws.send('PING', { binary: true, mask: true });
      }, 25000);
      ws.onmessage = event => {
        const data = angular.fromJson(event.data);
        if (data.status === 'OK') {
          clearInterval(interval);
          this.parsing.result = data.result;
          this.parsing.status = false;
          this.showResults($event, this.parsing.result);
        }
      };
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
