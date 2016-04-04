import ng from 'angular';

import interceptor from './interceptor';

export default ng.module('app.config', [ interceptor ]).name;
