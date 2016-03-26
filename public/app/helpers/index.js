import ng from 'angular';

// import user from './user.js';
import validator from './validator';
import parser from './parser';
import routeResolver from './route-resolver';

export default ng.module('app.helpers', [ validator, parser, routeResolver ]).name;
