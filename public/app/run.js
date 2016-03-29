import angular from 'angular';

export default angular.module('app.run', [])
  .run(function($rootScope, $state, ezfb) {
    'ngInject'
    ezfb.init({
      appId      : '1162828690396646',
      xfbml      : true,
      version    : 'v2.5'
    });
    $rootScope.$on('$stateChangeError', ($ev, to, toParams, from, fromParams, err) => {
      if (to.name !== 'signIn') {
        $state.go('signIn');
      }
      console.log('$stateChangeError', err, arguments);
    })

  }).name;
