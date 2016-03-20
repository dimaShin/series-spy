export default class RulesListController {
  constructor($injector) {
    'ngInject';
    this.parser = $injector.get('parser');
    this.user = $injector.get('user');
    this.$state = $injector.get('$state');
    this.modal = $injector.get('modal');
  }

  parse() {
    console.log('parse');
    this.parser.parse(this.rules)
      .then(this.matchResults.bind(this));
  }

  matchResults(results) {
    this.rules.forEach(rule => {
      rule.series = results.filter(result => result.rule_id === rule._id);
    });
  }

  addNewShow() {
    if (this.user.authorised) {
      this.$state.go('show');
    }

    this.modal.open({
      message: 'You are not logged in. All data will be saved in your browser\'s storage.'
    }).then(() => {
      this.user.provider = 'local';
      this.$state.go('show');
    })
      .catch()
  }
}
