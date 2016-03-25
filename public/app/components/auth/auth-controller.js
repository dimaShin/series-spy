import ng from 'angular';

export default class AuthController {

  constructor(user) {
    'ngInject';
    this.user = user;
    console.log('user', user);
  }

  openSignIn() {
  }

  openSignUp() {

  }
}
