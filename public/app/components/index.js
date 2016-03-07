import ng from 'angular';

import input from './input/input';
import home from './home/home';
import auth from './auth/auth';
import seriesList from './series-list/series-list';

export default ng.module('app.components', [ input, home, auth, seriesList ]).name;
