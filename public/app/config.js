import angular from 'angular';
import configRoutes from './config/routes';
import ThemesConfig from 'theme';

angular.module('config', [
  configRoutes,
  ThemesConfig
]);

export default 'config';
