import angular from 'angular';
import './codrops-vendors/normalize.css';
import  './codrops-vendors/set1.css';

import './input.scss';
import template from './input.html';
import link from './input-link';
import InputCtrl, { controller, controllerAs } from './input-ctrl';

export default angular.module('app.components.input', [ InputCtrl ])
  .directive('cdpInput', Validator => {
    'ngInject';
    return {

      restrict: 'E',
      scope: {
        id: '@',
        label: '@',
        type: '@',
        name: '@',
        validators: '=',
        model: '=',
        modelCtrl: '='
      },
      template,
      controller,
      controllerAs,
      link: link(Validator)

    }
  }).name;
