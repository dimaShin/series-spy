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
        signIn: {
          method: 'post',
          url: '/api/user/signin'
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
      rules: this.localStorage.getItem('x-rules') || [
        { title: 'Rule 1', id: Math.ceil(Math.random() * 10e5) },
        { title: 'Rule 2', id: Math.ceil(Math.random() * 10e5) },
        { title: 'Rule 3', id: Math.ceil(Math.random() * 10e5) },
        { title: 'Rule 4', id: Math.ceil(Math.random() * 10e5) }
      ]
    });
  }

}

export default ng.module('app.helpers.user', [ resource ])
  .service('user', User)
  .name;