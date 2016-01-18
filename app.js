'use strict';

const express = require('express');
const app = express();

const nodemailer = require('nodemailer');


const parser = require('./services/parser');
const CronJob = require('./services/cron');

const exOpts = require('./drivers/ex_rules');
const kinosvitOpts = require('./drivers/kinosvit_rules');

const PORT = 8081;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  return res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Start listening ' + PORT);
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
