import angular from 'angular';
import template from './rule-dialog.html';

import RuleDialogCtrl, { controller, controllerAs } from './rule-dialog-ctrl';

export default angular.module('components.rule-dialog', [
    RuleDialogCtrl
  ])
  .directive('ruleDialog', function () {
    "use strict";

    return {
      restrict: 'E',
      template,
      controller,
      controllerAs
    }

  }).name;
