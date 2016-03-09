export default class RuleDetailsController {
  constructor(user, $state) {
    "ngInject";
    this.user = user;
    this.$state = $state;
  }

  save() {
    if (!this.rule._id) {
      const newRule = this.user.rulesResource.add(this.rule);
      this.user.rules.push(newRule);
    } else {
      this.rule.$save();
    }

    return this.$state.go('shows');
  }
}
