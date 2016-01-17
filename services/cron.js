"use strict";


const CronJob = require('cron').CronJob;
const _ = require('lodash');

module.exports = (opts) => {

  const defaults = {
    cronTime: '00 25 04,20 * * *',
    start: true,
    runOnInit: true,
    timeZone: 'Europe/Kiev'
  };

  return new CronJob(_.defaults(opts, defaults));
};
