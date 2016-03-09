export default class RulesListController {
  constructor(parser) {
    'ngInject';
    this.parser = parser;
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
}
