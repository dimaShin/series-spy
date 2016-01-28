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
  },
  {
    path: '/api/rules/:_id',
    method: 'put',
    middleware: [ExCtrl.update]
  },
  {
    path: '/api/rules',
    method: 'post',
    middleware: [ExCtrl.create]
  },
  {
    path: '/api/parse',
    method: 'post',
    middleware: [ExCtrl.parse]
  }
].forEach(function(route) {
  router[route.method].apply(router, _.flatten([route.path, route.middleware]));
});




