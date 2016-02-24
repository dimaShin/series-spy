import ng from 'angular';

import routes from './routes.js';
import theme from './theme.js';

export default ng.module('app.config', [ routes, theme ]).name;
