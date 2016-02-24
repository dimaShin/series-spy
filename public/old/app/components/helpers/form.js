import angular from 'angular';
import ngMessages from 'angular-messages';
import _ from 'lodash';

export default angular.module('components.helpers.form', [ngMessages])
  .directive('form', function () {
    "use strict";
    return {
      restrict: 'E',
      require: 'form',
      link: ($scope, $el, $attr, form) => {
        form.$showErrors = () => {

          _.map(form, (control, key) => {

            if (key[0] === '$') {
              return;
            }

            control.$setDirty();
            control.$setTouched();
          });
        }

      }
    }
  }).name;

