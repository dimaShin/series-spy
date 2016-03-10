const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.get = async(function (req, res) {
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');


  const schedule = await(Schedule.findOne().exec());

  res.send(schedule);
});

module.exports.add = async(function (req, res) {
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');
  const schedule = new Schedule(req.body);

  schedule.save();

  res.send(schedule);
});
