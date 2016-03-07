export default class HomeController {
  constructor(user, parser) {
    'ngInject';
    this.parser = parser;
    this.user = user;
    console.log('user: ', user);
  }

  parse() {
    console.log('parse');
    this.parser.parse(this.user.rules)
      .then(this.matchResults.bind(this));
  }

  matchResults(results) {
    this.user.rules.forEach(rule => {
      rule.series = results.filter(result => result.rule_id === rule._id);
    });
  }
}
