import ng from 'angular';

import input from 'input/input';
import './sign-in.scss';
import template from './sign-in.html';

export default ng.module('app.components.signin', [ input ])
  .component('signIn', {
    template
  }).name;
