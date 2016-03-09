import angular from 'angular';
import 'ng-dialog/css/ngDialog.css';

import template from './confirm-modal.html';
import './confirm-modal.scss';

export default angular.module('app.components.modal.confirm-modal', [])
  .component('confirmModal', {
    bindings: {
      message: '=',
      close: '=',
      dismiss: '='
    },
    template
  }).name;
