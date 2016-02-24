import angular from 'angular';

export default angular.module('components.helpers.wrapEl', [])
  .directive('wrapEl', function () {
    "use strict";
    return {
      restrict: 'A',
      compile: ($el, $attr) => {
        const wrapEl = angular.element($attr.wrapEl);
        console.log(wrapEl);
      }
    }
  }).name;


