import angular from 'angular';
import ngDialog from 'ng-dialog';

import template from './rule-row.html';
import controller from './rule-row-controller';
import './rule-row.scss';

export default angular.module('app.components.rule-row', [ ngDialog ])
  .component('ruleRow', {
    bindings: {
      rule: '='
    },
    template,
    controller
  }).name;
