import angular from 'angular';
import template from './rules-list.html';

import RuleRow from './rule-row/rule-row';
import RulesListCtrl, { controller, controllerAs } from './rules-list-ctrl';
import ParsingResults from 'components/parsing-results/parsing-results';

angular.module('components.rules-list', [
  RuleRow,
  RulesListCtrl,
  ParsingResults
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
