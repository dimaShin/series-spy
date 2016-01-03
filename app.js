'use strict';

const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;


const parser = require('./services/parser');
const parseOptions = {
  driver: 'exUa',
  method: 'foreignSerials',
  rules: [
    {
      regExp: new RegExp('Касл.*Castle', 'i'),
      season: 8,
      episode: 9
    },
    {
      regExp: new RegExp('Big\\sBang\\sTheory', 'i'),
      season: 9,
      episode: 12
    },
    {
      regExp: new RegExp('Марко\\sПоло.*Marco\\sPolo', 'i'),
      season: 2,
      episode: 1
    },
    {
      regExp: new RegExp('Марко\\sПоло.*Marco\\sPolo', 'i'),
      season: 2,
      episode: 1
    },
    {
      regExp: new RegExp('Вечность.*Forever', 'i')
    },
    {
      regExp: new RegExp('Бруклин.*Brooklyn', 'i')
    },
    {
      regExp: new RegExp('Элементарно.*Elementary', 'i'),
      season: 4,
      episode: 7
    },
    {
      regExp: new RegExp('Игра\\sПрестолов.*game of thrones', 'i')
    },
    {
      regExp: new RegExp('Шерлок.*Sherlock', 'i')
    },
    {
      regExp: new RegExp('Области\\s*тьмы.*limitless', 'i'),
      season: 1,
      episode: 12
    }
  ]
};


var job = new CronJob({
  cronTime: '00 25 04,20 * * *',
  onTick () {
    console.log('start parsing');
    parser.parse(parseOptions).then(result => {
      if (!result || !result.length) {
        console.log('nothing new');
        return;
      }

      console.log('found ' + result.length + ' new series');
      //const mailer = require('./services/mailer');
      //mailer.send({
      //  tplPath: __dirname + '/email.hbs',
      //  data: result
      //});
    });
  },
  onComplete () {
    console.log('closing job');
  },
  start: true,
  runOnInit: true,
  timeZone: 'Europe/Kiev'
});


