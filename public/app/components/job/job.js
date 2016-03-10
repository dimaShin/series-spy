import angular from 'angular';

import './job.scss';
import template from './job.html';
import controller from './job-controller';

export default angular.module('app.components.job', [])
  .component('job', {
    bindings: {
      job: '='
    },
    template,
    controller
  }).name;
