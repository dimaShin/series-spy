const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.get = async(function (req, res) {
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');


  const schedule = await(Schedule.find().exec());

  res.send(schedule);
});

module.exports.add = async(function (req, res) {
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');
  const schedule = new Schedule(req.body);

  schedule.save();

  res.send(schedule);
});

module.exports.save = async(function (req, res) {
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');
  const schedule = await(Schedule.findOne({ _id: req.body._id }).exec());

  _.assign(schedule, req.body);

  schedule.save();

  res.send(schedule);
});

module.exports.delete = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Schedule = db.model('Schedule');

  await(Schedule.findByIdAndRemove(req.params._id, err => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }));

  res.sendStatus(200);
});
