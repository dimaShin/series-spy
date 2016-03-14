const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.get = async(function (req, res) {
  const db = req.app.get('db');
  const Job = db.model('Job');


  const job = await(Job.find().exec());

  res.send(job);
});

module.exports.add = async(function (req, res) {
  const db = req.app.get('db');
  const Job = db.model('Job');
  const job = new Job(req.body);

  job.save();

  res.send(job);
});

module.exports.save = async(function (req, res) {
  const db = req.app.get('db');
  const Job = db.model('Job');
  const job = await(Job.findOne({ _id: req.body._id }).exec());

  _.assign(job, req.body);
  job.save();

  res.send(job);
});

module.exports.delete = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Job = db.model('Job');

  await(Job.findByIdAndRemove(req.params._id, err => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }));

  res.sendStatus(200);
});
