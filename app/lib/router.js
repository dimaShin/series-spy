const _ = require('lodash');
const express = require('express');
const router = module.exports = express.Router();
const ExCtrl = require('../controllers/ex');

[
  {
    path: '/api/rules',
    method: 'get',
    middleware: [ExCtrl.get]
  },
  {
    path: '/api/rules/:_id',
    method: 'delete',
    middleware: [ExCtrl.delete]
  }
]
  .forEach(function(route) {
    router[route.method].apply(router, _.flatten([route.path, route.middleware]));
  });
