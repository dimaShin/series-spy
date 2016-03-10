import ng from 'angular';
import _ from 'lodash';
import resource from 'angular-resource';

class User {
  constructor ($resource, $window, $q) {
    "ngInject";
    this.localStorage = $window.localStorage;
    this.$q = $q;
    this.$resource = $resource('/api/user/:token',
      { token: '@token' },
      {
        getDefaultRules: {
          url: '/api/rules',
          isArray: true,
          method: 'get'
        },
        signIn: {
          method: 'post',
          url: '/api/user/signin'
        },
        parse: {
          method: 'post',
          url: 'api/parse',
          isArray: true
        }
      });
    this.rulesResource =  $resource('/api/rules/:_id',
      { _id: '@_id' },
      {
        save: {
          method: 'put'
        },
        add: {
          method: 'post'
        }
      });

    this.scheduleResourse = $resource('/api/schedule/:_id',
      {_id: '@_id'},
      {
        save: {
          method: 'put'
        },
        add: {
          method: 'post'
        }
      });
  }

  getSchedule() {
    if (this.schedule) {
      return this.schedule;
    }
    this.schedule = this.scheduleResourse.get();
    return this.schedule;
  }

  resolve() {
    if (this.$resolved) {
      return this;
    }
    const token = this.localStorage.getItem('x-token');
    if (!token) {
      return this.getDefaultUser();
    }
    return this.$resource.get({ token: token }).then(user => {
      _.assign(this, user, {
        resolved: true
      })
    });
  }

  getDefaultUser() {
    return _.assign(this, {
      $resolved: true,
      authorised: false,
      name: 'Guest',
      rules: this.rulesResource.query()
    });
  }

  getRules(ruleId) {
    if (!ruleId) {
      return this.rules;
    }
    if (!this.rules.$resolved) {
      return this.$q(resolve => {
        this.rules.$promise.then(rules => {
          resolve(this._getRuleById(rules, ruleId));
        })
      })
    }
    return this._getRuleById(this.rules, ruleId);
  }

  _getRuleById(rules, ruleId) {
    const rule = rules.find(rule => {
      return rule._id === ruleId
    });
    if (!rule) {
      throw new Error('Sorry, but there is no such rule.');
    }
    return rule;
  }

}

export default ng.module('app.helpers.user', [ resource ])
  .service('user', User)
  .name;