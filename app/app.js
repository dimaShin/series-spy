'use strict';
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./lib/mongodb');
const nodemailer = require('nodemailer');
const router = require('./lib/router');
const cron = require('./lib/cron');


app.configure = initialOptions => {
  app.set('socket', initialOptions.socketManager);
};

app.set('db', db);
app.set('cron', cron);

const policyManager = require('./lib/policy')(app);
const tokenManager = require('./lib/token')();
app.set('policy', policyManager);
app.set('token', tokenManager);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public/dist'));
app.use('/api/private', policyManager.middleware.bind(policyManager));
app.use(router);
app.use('*', (req, res) => {
  console.log('rendering index.html');
  try {
    res.sendFile(path.join(__dirname,'../public/dist/index.html'));
  } catch (err) {
    console.log('got err: ', err);
    res.send(err);
  }

});


module.exports = app;