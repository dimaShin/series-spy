import angular from 'angular';

import ruleRow from 'rule-row/rule-row';
import ruleDetails from 'rule-details/rule-details';

import RulesListController from './rules-list-controller';
import template from './rules-list.html';
import './rules-list.scss';

export default angular.module('app.components.rules-list', [ ruleRow, ruleDetails ])
  .component('rulesList', {
    bindings: {},
    template,
    controller: RulesListController
  }).name;
