import angular from 'angular';
import API from 'api';

class RuleDialogCtrl {
  static $inject = ['$injector'];

  constructor ($injector) {
    this.$mdDialog = $injector.get('$mdDialog');
    this.Rules = $injector.get('API').rules;
    this.rule = {
      season: 1,
      episode: 1
    }
  }

  close () {

    if (this.form.$invalid) {
      this.form.$setDirty();
      return;
    }

    this.Rules.save(this.rule).then(rule => {
      this.$mdDialog.hide(rule);
    }).catch(err => {
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(err.data)
          .position('right top')
          .parent(window.body)
          .hideDelay(5000)
      );
    })
  }

  cancel () {
    this.$mdDialog.cancel();
  }
}

export default angular.module('components.rule-dialog-ctrl', [
  API
]).controller('RuleDialogCtrl', RuleDialogCtrl).name;

export const controller = 'RuleDialogCtrl';
export const controllerAs = 'RDCtrl';
