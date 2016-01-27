import angular from 'angular';

export default angular.module('components.helpers.input-width', [])
  .directive('inputWidth', function () {
    "use strict";
    return {
      restrict: 'A',
      link: ($scope, $el, $attr) => {
        $attr.$observe('inputWidth', digits => {
          console.log('observe: ', digits);
          $el.css({
            width: digits * 25 + 'px'
          });
        });

      }
    }
  }).name;
