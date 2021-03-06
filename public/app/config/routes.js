import ng from 'angular';
import router from 'angular-ui-router';

export default ng.module('app.config.router', [ router ])
  .config(($stateProvider, $locationProvider, $urlRouterProvider, resolveProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/shows');

    $stateProvider
      .state('auth', {
        abstract: true,
        template: '<ui-view></ui-view>',
        resolve: {
          auth: ['user', '$state', user => {
            return user.signin();
          }]
        }
      })
      .state('shows', {
        url: '/shows',
        parent: 'auth',
        template: '<rules-list rules="$resolve.rules"></rules-list>',
        controller: function (rules) {
          "ngInject";
          this.rules = rules;
        },
        controllerAs: '$resolve',
        resolve: {
          rules: ['rules', 'user', (rules, user) => {
            return rules.get({ user_id: user.get()._id });
          }]
        }
      })
      .state('schedule', {
        url: '/schedule',
        parent: 'auth',
        template: '<schedule jobs="$resolve.jobs"></schedule>',
        controller: resolveProvider.getController(['jobs']),
        controllerAs: '$resolve',
        resolve: {
          jobs: (user, jobs) => {
            "ngInject";
            return jobs.get({ user_id: user.get()._id});
          }
        }
      })
      .state('show', {
        url: '/show/:_id',
        parent: 'auth',
        template: '<rule-details rule="$ctrl.rule"></rule-details>',
        params: {
          rule: null
        },
        resolve: {
          rule: (user, $stateParams) => {
            "ngInject";
            if (!$stateParams._id) {
              return {}
            }

            if ($stateParams.rule) {
              return $stateParams.rule;
            }
            return user.getRules($stateParams._id);
          }
        },
        controller: function (rule) {
          "ngInject";
          this.rule = rule;
        },
        controllerAs: '$ctrl'
      })
      .state('signIn', {
        url: '/sigin',
        template: '<sign-in></sign-in>'
      })

  }).name;
