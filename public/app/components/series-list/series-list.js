import angular from 'angular';
import template from './series-list.html';
import './series-list.scss';

import seriesRow from 'series-row/series-row';

export default angular.module('app.components.series', [ seriesRow ])
  .component('seriesList', {
    bindings: {
      series: '='
    },
    template
  })
  .name;
