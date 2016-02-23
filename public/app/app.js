import ng from 'angular';

import config from './config';
import helpers from './helpers';
import components from './components/';

export default ng.module('app', [ config, helpers, components ]).name;
