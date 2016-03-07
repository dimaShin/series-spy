import angular from 'angular';

import template from './series-row.html';
import './series-row.scss';

export default angular.module('app.components.series-row', [])
  .component('seriesRow', {
    bindings: {
      series: '='
    },
    template
  })
  .name;
