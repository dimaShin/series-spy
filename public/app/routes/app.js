import angular from 'angular';
import ngRoute from 'angular-ui-router';

function appRouteConfig ($stateProvider) {
  'ngInject';
  $stateProvider.state('home', {
    url: '',
    template: '<ui-view></ui-view>',
    resolve: ['user', user => user.resolve()]
  })
    .state('shows', {
      url: '/shows',
      template: '<rules-list></rules-list>',
      parent: 'home'
    })
    .state('show', {
      url: '/show/:_id',
      parent: 'home',
      template: '<rule-details rule="$resolve.rule"></rule-details>',
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
      controllerAs: '$resolve'
    })
}



export default angular.module('app.routes.app', [ ngRoute ])
  .config(appRouteConfig)
  .name;

