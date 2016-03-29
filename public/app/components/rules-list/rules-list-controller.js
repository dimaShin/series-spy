export default class RulesListController {
  constructor($injector) {
    'ngInject';
    this.parser = $injector.get('parser');
    this.user = $injector.get('user');
    this.$state = $injector.get('$state');
    this.modal = $injector.get('modal');
    this.rules = this.user.getRules();
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
    this.$state.go('show');
  }
}
