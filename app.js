'use strict';

const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;


const parser = require('./services/parser');
const exOpts = require('./drivers/ex_rules');
const kinosvitOpts = require('./drivers/kinosvit_rules');


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

console.log('start parsing');
parser.parse(exOpts).then(result => {
  if (!result || !result.length) {
    console.log('nothing new');
    return;
  }

  console.log('found ' + result.length + ' new series');
  const mailer = require('./services/mailer');
  mailer.send({
    tplPath: __dirname + '/email.hbs',
    data: result
  });
});
