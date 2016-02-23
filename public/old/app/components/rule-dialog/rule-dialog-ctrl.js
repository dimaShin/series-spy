import angular from 'angular';
import API from 'api';
import _ from 'lodash';
import FormHelper from 'helpers/form';

class RuleDialogCtrl {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.$mdDialog = $injector.get('$mdDialog');
    this.$mdToast = $injector.get('$mdToast');
    this.API = $injector.get('API');
    this.rule = {
      season: 1,
      episode: 1
    }
  }

  save () {

    if (this.form.$invalid) {
      this.form.$showErrors();
      return;
    }

    this.API.rules.save(this.rule).$promise
    .then(rule => {
      this.$mdDialog.hide(rule);
    })
    .catch(err => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(err.data)
          .position('right top')
          .parent(window.body)
          .hideDelay(5000)
      );
    });
  }

  cancel () {
    this.$mdDialog.cancel();
  }
}

export default angular.module('components.rule-dialog-ctrl', [
  API, FormHelper
]).controller('RuleDialogCtrl', RuleDialogCtrl).name;

export const controller = 'RuleDialogCtrl';
export const controllerAs = 'RDCtrl';
