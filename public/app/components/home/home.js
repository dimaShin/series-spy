import ng from 'angular';

import rulesList from 'rules-list/rules-list';

import template from './home.html';
import './home.scss';
import HomeController from './home-controller';

export default ng.module('app.components.root', [ rulesList ])
  .component('spyHome', {
    template,
    controller: HomeController
  })
  .name;