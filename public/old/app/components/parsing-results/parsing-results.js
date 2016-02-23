require('./parsing-results.scss');
import angular from 'angular';
import template from './parsing-results.html';

export default angular.module('components.parsing-results', [])
  .directive('parsingResults', () => {
    "use strict";
    return  {
      restrict: 'E',
      scope: {
        results: '='
      },
      template
    }
  }).name;

