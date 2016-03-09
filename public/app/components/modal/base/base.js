import angular from 'angular';
import animate from 'angular-animate';

import template from './base.html';
import './base.scss';


export default angular.module('app.components.modal.base', [])
  .component('modalContainer', {
    template
  }).name;
