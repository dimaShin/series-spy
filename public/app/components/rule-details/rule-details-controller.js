export default class RuleDetailsController {
  constructor(user, $state) {
    "ngInject";
    this.user = user;
  }

  save() {
    if (!this.rule._id) {
      this.rule._id = Math.ceil(Math.random() * 10e7);
      let loggedUser = this.user.get();
      loggedUser.shows.push(this.rule);
    }

    this.user.save();

    return this.$state.go('shows');
  }
}
