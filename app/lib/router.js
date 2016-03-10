const _ = require('lodash');
const express = require('express');
const router = module.exports = express.Router();
const ExCtrl = require('../controllers/ex');
const ScheduleCtrl = require('../controllers/schedule');

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
  },
  {
    path: '/api/jobs',
    method: 'get',
    middleware: [ScheduleCtrl.get]
  },
  {
    path: '/api/jobs',
    method: 'post',
    middleware: [ScheduleCtrl.add]
  },
  {
    path: '/api/jobs',
    method: 'put',
    middleware: [ScheduleCtrl.save]
  },
  {
    path: '/api/jobs/:_id',
    method: 'delete',
    middleware: [ScheduleCtrl.delete]
  }
].forEach(function(route) {
  router[route.method].apply(router, _.flatten([route.path, route.middleware]));
});




