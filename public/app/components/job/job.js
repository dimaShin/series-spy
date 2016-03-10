import angular from 'angular';

import './job.scss';
import template from './job.html';


export default angular.module('app.components.job', [])
  .component('job', {
    bindings: {
      job: '='
    },
    template
  }).name;
