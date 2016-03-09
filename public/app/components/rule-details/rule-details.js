import angular from 'angular';

import template from './rule-details.html'
import controller from './rule-details-controller';

export default angular.module('app.components.rule-details', [])
  .component('ruleDetails', {
    bindings: {
      rule: '='
    },
    template,
    controller
  })
  .name;
