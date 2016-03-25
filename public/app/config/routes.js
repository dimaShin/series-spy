import ng from 'angular';
import router from 'angular-ui-router';

export default ng.module('app.config.router', [ router ])
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/shows');

    $stateProvider
      .state('home',
        {
          url: '/',
          abstract: true,
          template: '<spy-home></spy-home>',
          resolve: {
            user: ['user', user => {
              return user.resolve();
            }]
          }
      })
    .state('shows',
      {
        url: 'shows',
        parent: 'home',
        template: '<rules-list rules="$ctrl.user.rules"></rules-list>',
        controller: function (user) {
          "ngInject";
          this.user = user;
        },
        controllerAs: '$ctrl'
    })
    .state('schedule',
      {
        url: 'schedule',
        parent: 'home',
        template: '<schedule></schedule>',
        resolve: {
          jobs: (user) => {
            "ngInject";
            return user.getJobs().$promise;
          }
        }
    })
    .state('show',
      {
        url: 'show/:_id',
        parent: 'home',
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
