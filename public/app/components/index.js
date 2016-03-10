import ng from 'angular';

import input from './input/input';
import home from './home/home';
import auth from './auth/auth';
import seriesList from './series-list/series-list';
import modal from './modal';
import schedule from './schedule/schedule';

export default ng.module('app.components',
  [ input, home, auth, seriesList, modal, schedule ])
  .name;
