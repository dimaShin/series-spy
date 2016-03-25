import ng from 'angular';

import provider from 'models/provider/';
import user from 'models/user/user-model';
import './sign-in.scss';
import template from './sign-in.html';
import SignInController from './sign-in-controller'

export default ng.module('app.components.sign-in', [ provider, user ])
  .component('signIn', {
    template,
    controller: SignInController
  })
  .name;
