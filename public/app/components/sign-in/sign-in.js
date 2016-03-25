import ng from 'angular';
import uiModal from 'angular-ui-bootstrap/src/modal';

import './sign-in.scss';
import template from './sign-in.html';
import SignInController from './sign-in-controller'

export default ng.module('app.components.sign-in', [ uiModal ])
  .component('signIn', {
    template,
    controller: SignInController
  })
  .name;
