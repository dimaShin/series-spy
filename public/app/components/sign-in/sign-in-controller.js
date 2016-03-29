export default class SignInController {
  constructor($injector) {
    'ngInject';

    this.modal = $injector.get('modal');
    this.$state = $injector.get('$state');
    this.provider = $injector.get('provider');
    this.user = $injector.get('user');
    this.ezfb = $injector.get('ezfb');
  }

  anonymous() {
    this.modal.open({
      plain: true,
      template: '<confirm-modal ' +
        'dismiss="this.dismiss"' +
        'close="this.close"' +
        'message="this.message"' +
        '></confirm-modal>',
      message: `All your data will be saved in current browser.`
    }).then(() => {
      this.provider.set('local');
      this.$state.go('shows');
    });
  }

  login(provider) {
    switch (provider) {
      case 'fb':
        return this._fbLogin();
    }
  }

  _fbLogin() {
    this.ezfb.login().then(response => {
      let user = {
        straightLogin: true,
        providerData: {
          provider: 'fb',
          response: response
        }
      };

      this.user.signup(user);
      console.log(response);
    })
  }
}
