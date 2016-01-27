import angular from 'angular';
import template from './rules-list.html';

import RuleRow from './rule-row/rule-row';

import RulesListCtrl, { controller, controllerAs } from './rules-list-ctrl';

angular.module('components.rules-list', [
  RuleRow,
  RulesListCtrl
])
  .directive('rulesList', function () {
    "use strict";

    return {
      restrict: 'E',
      template,
      controller,
      controllerAs
    }

  });

export default 'components.rules-list';
