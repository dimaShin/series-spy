import ng from 'angular';
import _ from 'lodash';
import resource from 'angular-resource';

class User {
  constructor ($resource, $window) {
    "ngInject";
    this.localStorage = $window.localStorage;
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
  }

  resolve() {
    console.log('resolve: ', this.user);
    if (this.resolved) {
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
      resolved: true,
      authorised: false,
      name: 'Guest',
      rules: this.$resource.getDefaultRules()
    });
  }

  getRules(ruleId) {
    if (!ruleId) {
      return this.rules;
    }

    const rule = this.rules.find(rule => rule._id === ruleId);

    if (!rule) {
      throw new Error('Sorry, but there is no such rule.');
    }

    return rule;
  }

}

export default ng.module('app.helpers.user', [ resource ])
  .service('user', User)
  .name;