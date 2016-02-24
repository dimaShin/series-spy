import ng from 'angular';

import user from './user.js';
import rules from './rules.js';

export default ng.module('app.helpers', [ user, rules ]).name;
