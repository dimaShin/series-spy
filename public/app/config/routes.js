import ng from 'angular';
import router from 'angular-ui-router';

export default ng.module('app.config.router', [ router ])
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/shows');

    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        template: '<spy-home></spy-home>'
      })
      .state('userResolver', {
        abstract: true,
        template: '<ui-view></ui-view>',
        parent: 'home',
        resolve: {
          loggedUser: ['user', '$state', (user, $state) => {
            let loggedUser = user.get();
            console.log('user: ', loggedUser);
            return user.get();
          }]
        }
      })
      .state('shows', {
        url: 'shows',
        parent: 'userResolver',
        template: '<rules-list ' +
          ' rules="$resolve.rules"></rules-list>',
        controller: function (loggedUser, rules) {
          "ngInject";
          this.rules = rules.get({ user_id: loggedUser._id });
        },
        controllerAs: '$resolve',
        resolve: {
          rules: ['rules', 'loggedUser', (rules, loggedUser) => {
            console.log('resolved user: ', loggedUser);
            return rules.get({ user_id: loggedUser._id })
          }]
        }
      })
      .state('schedule', {
        url: 'schedule',
        parent: 'userResolver',
        template: '<schedule></schedule>',
        resolve: {
          jobs: (user) => {
            "ngInject";
            return user.getJobs().$promise;
          }
        }
      })
      .state('show', {
        url: 'show/:_id',
        parent: 'userResolver',
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
        parent: 'home',
        url: 'sigin',
        template: '<sign-in />'
      })

  }).name;
