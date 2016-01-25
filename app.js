'use strict';

const express = require('express');
const app = express();

const db = require('./app/lib/mongodb');

const nodemailer = require('nodemailer');
const router = require('./app/lib/router');


//const parser = require('./app/services/parser');
//const CronJob = require('./app/services/cron');
//
//const exOpts = require('./app/drivers/ex_rules');
//const kinosvitOpts = require('./app/drivers/kinosvit_rules');


const PORT = 8081;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/dist/index.html');
});

app.use(express.static(__dirname + '/public/dist'));
app.use(router);

app.set('db', db);

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Start listening ' + PORT);
});

app.get('/api/rules', (req, res) => {
  res.send([
    {
      id: 0,
      title: 'one'
    },
    {
      id: 1,
      title: 'two'
    }
  ]);
});


//var job = new CronJob({
//  cronTime: '00 25 04,20 * * *',
//  onTick () {
//    console.log('start parsing');
//    parser.parse(exOpts).then(result => {
//      if (!result || !result.length) {
//        console.log('nothing new');
//        return;
//      }
//
//      console.log('found ' + result.length + ' new series');
//      const mailer = require('./services/mailer');
//      mailer.send({
//        tplPath: __dirname + '/email.hbs',
//        data: result
//      });
//    });
//  },
//  onComplete () {
//    console.log('closing job');
//  },
//  start: true,
//  runOnInit: true,
//  timeZone: 'Europe/Kiev'
//});

//console.log('start parsing');
//parser.parse(exOpts).then(result => {
//  if (!result || !result.length) {
//    console.log('nothing new');
//    return;
//  }
//
//  console.log('found ' + result.length + ' new series');
//  const mailer = require('./services/mailer');
//  mailer.send({
//    tplPath: __dirname + '/email.hbs',
//    data: result
//  });
//});
