'use strict';

const express = require('express');
const app = express();
const fs = require('fs');

const nodemailer = require('nodemailer');


const parser = require('./services/parser');
const CronJob = require('./services/cron');

const exOpts = require('./drivers/ex_rules');
const kinosvitOpts = require('./drivers/kinosvit_rules');


const PORT = 8081;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/dist/index.html');
});

app.use(express.static(__dirname + '/public/dist'));


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
