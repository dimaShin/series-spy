import angular from 'angular';
import API from './../../API/api';

angular.module('components.app.ctrl', [API])
  .controller('AppController', AppCtrl);

AppCtrl.$inject = ['$injector'];
function AppCtrl ($injector) {
  "use strict";

  this.API = $injector.get('API');
  this.$mdDialog = $injector.get('$mdDialog');
  this.$mdToast = $injector.get('$mdToast');

  this.rules = this.API.rules.query();
}

AppCtrl.prototype.deleteRule = function ($event, rule) {
  "use strict";
  const confirm = this.$mdDialog.confirm()
    .title('Are you sure you want to delete ' + rule.title)
    .textContent('All information will be lost.')
    .targetEvent($event)
    .ok('Delete!')
    .cancel('Cancel');

  this.$mdDialog.show(confirm).then(this._deleteRule.bind(this, rule));
};

AppCtrl.prototype._deleteRule = function (rule) {
  "use strict";
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
};

export default 'components.app.ctrl';
export const controller = 'AppController';
export const controllerAs = 'AppCtrl';
