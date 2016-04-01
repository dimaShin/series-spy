import ng from 'angular';

// import user from './user.js';
import validator from './validator';
import parser from './parser';
import routeResolver from './route-resolver';
import token from './token';

export default ng.module('app.helpers',
  [ validator, parser, routeResolver, token ]).name;
