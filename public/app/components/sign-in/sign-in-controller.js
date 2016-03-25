export default class SignInController {
  constructor($injector) {
    'ngInject';

    this.modal = $injector.get('modal');
    this.$state = $injector.get('$state');
    this.provider = $injector.get('provider');
    this.user = $injector.get('user');
  }

  anonymous() {
    console.log('before: ', this);
    this.modal.open({
      plain: true,
      template: '<confirm-modal ' +
        'dismiss="this.dismiss"' +
        'close="this.close"' +
        'message="this.message"' +
        '></confirm-modal>',
      message: `All your data will be saved in current browser.`
    }).then(() => {
      console.log('after: ', this);
      this.provider.set('local');
      debugger;
      this.$state.go('shows');
    });
  }
}
