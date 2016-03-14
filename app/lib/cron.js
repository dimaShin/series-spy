var CronJob = require('cron').CronJob;

const jobs = {};

module.exports.set = function (cronOptions) {
  console.log('creating cron: ', cronOptions);
  const job = new CronJob({
    cronTime: cronOptions.time,
    onTick: cronOptions.onTick,
    start: true,
    timeZone: 'Europe/Kiev'
  });

  if (jobs[cronOptions.name]) {
    console.log('stopping cron');
    jobs[cronOptions.name].stop();
  }

  jobs[cronOptions.name] = job;
  job.start();
  return job;
};