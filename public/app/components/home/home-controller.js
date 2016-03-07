export default class HomeController {
  constructor(user) {
    'ngInject';
    this.user = user;
    console.log('user: ', user);
  }
}
