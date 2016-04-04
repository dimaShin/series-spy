export default class RulesListController {
  constructor($injector) {
    'ngInject';
    this.parser = $injector.get('parser');
    this.$state = $injector.get('$state');
    this.modal = $injector.get('modal');
    this.userModel = $injector.get('user');
    this.localStorage = $injector.get('$window').localStorage;
    this.rules = this.getRules();
    console.log('rules: ', this.rules);
  }

  getRules() {
    let user = this.userModel.get();
    
    if (!user) {
      return this._getLocalRules();
    }

    if (!user.shows) {
      user.shows = [];
    }

    return user.shows;
  }

  _getLocalRules() {
    let rules = this.localStorage.getItem('tv-rules');
    if (!rules) {
      return [];
    }

    try {
      rules = JSON.parse(rules);
    } catch (err) {
      throw `Fail to parse rules ${rules}`;
    }

    return rules;
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
