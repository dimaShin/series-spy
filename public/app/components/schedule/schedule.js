import angular from 'angular';

import input from 'input/input';

import template from './schedule.html';
import controller from './schedule-controller';
import './schedule.scss';

export default angular.module('app.components.schedule', [ input ])
  .component('schedule', {
    template,
    controller
  }).name;
