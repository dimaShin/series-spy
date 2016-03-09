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
    });
  }).name;
