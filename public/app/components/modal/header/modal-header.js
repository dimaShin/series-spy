import angular from 'angular';

import template from './modal-header.html';
import './modal-header.scss';

export default angular.module('app.components.modal.header', [])
  .component('modalHeader', {
    bindings: {
      title: '=',
      dismiss: '='
    },
    template
  }).name;
