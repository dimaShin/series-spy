import angular from 'angular';
import template from './rule-row.html';
import inputWidth from 'helpers/input-width';

import RulesListCtrl, { controller, controllerAs } from './rule-row-ctrl';

export default angular.module('components.rule-row', [
  RulesListCtrl,
  inputWidth
])
  .directive('ruleRow', function () {
    "use strict";

    return {
      restrict: 'E',
      scope: {
        rule: '='
      },
      template,
      controller,
      controllerAs
    }

  }).name;