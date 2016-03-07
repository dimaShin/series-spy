import ng from 'angular';

export default class AuthController {

  constructor($uibModal, user) {
    'ngInject';
    this.$uibModal = $uibModal;
    this.user = user;
    console.log('user', user);
  }

  openSignIn() {
    console.log(this.$uibModal);
  }

  openSignUp() {

  }
}
