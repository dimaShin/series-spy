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
              "use strict";
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
        template: '<schedule></schedule>'
    })
    .state('show',
      {
        url: 'show/:id',
        parent: 'home',
        template: '<rule-details rule="$ctrl.rule"></rule-details>',
        resolve: {
          rule: (user, $stateParams) => {
            "ngInject";
            if (!$stateParams.id && !$stateParams.rule) {
              return {}
            }

            if ($stateParams.rule) {
              return $stateParams.rule;
            }

            return user.getRules($stateParams.id);
          }
        },
        controller: function (rule) {
          "ngInject";
          this.rule = rule;
        },
        controllerAs: '$ctrl'
    });
  }).name;
