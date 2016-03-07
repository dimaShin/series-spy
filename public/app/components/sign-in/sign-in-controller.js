export default class SignInController {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;
  }

  openModal() {
    console.log(this.$uibModal);
  }
}
