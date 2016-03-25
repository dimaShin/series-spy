import angular from 'angular';

class Rules {
  constructor($injector){
    'ngInject';

    this.localStorage = $injector.get('window').localStorage;
    this.$q = $injector.get('$q');
    this.$resource = $injector.get('$resource')('/api/rules/:_id',
      { _id: '@_id' },
      {
        save  : { method: 'put' },
        create: { method: 'post' }
      });

    this.rulesById = {};
  }

  get(params) {
    
  }

  getById(ruleId) {
    if (this.rulesById[ruleId]) {
      return this.rules[ruleId];
    }

    if (this.user.provider === 'local') {
      let rules = this.localStorage.getItem('rules');

      rules = JSON.parse(rules);
      let rule = rules && rules.find(rule => {
          return rule._id === ruleId;
        });
      return this.$q( (resolve, reject) => {

        if (rule) {
          return resolve(rule);
        }

        reject('Sorry! There is no such rule.');
      })
    }

    return this.$resource.get({_id: ruleId })
      .then(rule => {
        this.rulesById[ruleId] = rule;
      });
  }
}
