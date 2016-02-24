"use strict";

import angular from 'angular';

class RuleRow {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.$mdDialog = $injector.get('$mdDialog');
    this.$mdToast = $injector.get('$mdToast');
  }

  onChange ($event, rule) {
    rule.$put().catch(err => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(err.data)
          .position('right top')
          .parent(window.body)
          .hideDelay(5000)
      );
    })
  }

  onDelete ($event, rule) {
    const confirm = this.$mdDialog.confirm()
      .title('Are you sure you want to delete ' + rule.title)
      .textContent('All information will be lost.')
      .targetEvent($event)
      .ok('Delete!')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(this._delete.bind(this, rule));
  }

  _delete (rule) {
    rule.$delete().then(() => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent('Success!')
          .position('right top')
          .parent(window.body)
          .hideDelay(1000)
      );

      this.rules.splice(this.rules.indexOf(rule), 1);

    }).catch(err => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(err.data)
          .position('right top')
          .parent(window.body)
          .hideDelay(5000)
      );
    });
  }
}

export default angular.module('components.rule-row.ctrl', [])
  .controller('RowController', RuleRow)
  .name;

export const controller = 'RowController';
export const controllerAs = 'RowCtrl';

