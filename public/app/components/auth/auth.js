import ng from 'angular';

import signInComponent from 'sign-in/sign-in';

import template from './auth.html';
import './auth.scss';
import AuthController from './auth-controller';

export default ng.module('app.components.auth', [ signInComponent ])
  .component('spyAuth', {
    template,
    controller: AuthController
  })
  .name;
