import angular from 'angular';

import ruleRow from 'rule-row/rule-row';

import RulesListController from './rules-list-controller';
import template from './rules-list.html';
import './rules-list.scss';

export default angular.module('app.components.rules-list', [ ruleRow ])
  .component('rulesList', {
    bindings: {
      rules: '='
    },
    template,
    controller: RulesListController
  }).name;
