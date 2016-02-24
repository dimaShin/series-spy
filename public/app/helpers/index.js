import ng from 'angular';

import user from './user.js';
import validator from './validator';

export default ng.module('app.helpers', [ user, validator ]).name;
