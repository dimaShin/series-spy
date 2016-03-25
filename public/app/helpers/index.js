import ng from 'angular';

// import user from './user.js';
import validator from './validator';
import parser from './parser';

export default ng.module('app.helpers', [ validator, parser ]).name;
