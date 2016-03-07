import ng from 'angular';

import input from './input/input';
import home from './home/home';
import auth from './auth/auth';

export default ng.module('app.components', [ input, home, auth ]).name;
