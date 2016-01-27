import angular from 'angular';
import ngMaterial from 'angular-material';

ThemeConfig.$inject = ['$mdThemingProvider'];
function ThemeConfig ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('teal');
}

export default angular.module('config.theme', [ngMaterial])
  .config(ThemeConfig)
  .name;