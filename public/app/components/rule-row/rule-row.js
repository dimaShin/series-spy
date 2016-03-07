import angular from 'angular';

import template from './rule-row.html';
import './rule-row.scss';

export default angular.module('app.components.rule-row', [])
  .component('ruleRow', {
    bindings: {
      rule: '='
    },
    template
  }).name;
