import angular from 'angular';

export default angular.module('app.run', [])
  .run(function($rootScope, $state) {
    'ngInject'

    $rootScope.$on('$stateChangeError', ($ev, to, toParams, from, fromParams, err) => {
      $state.go('signIn');
      throw (err);
    })

  }).name;
