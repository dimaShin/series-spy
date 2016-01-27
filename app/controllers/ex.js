
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.get = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const rules = await(Rules.find().exec());

  res.send(rules);
});

module.exports.delete = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');

  console.log('deleting rule: ', req.params._id);
  await(Rules.findByIdAndRemove(req.params._id, err => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }));

  res.sendStatus(200);
});

module.exports.update = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const data = _.pick(req.body, ['title', 'season', 'episode']);

  Rules.findByIdAndUpdate(req.params._id,
    { $set: data },
    { new: true },
    (err, rule) => {
      if (err) return res.sendStatus(400);

      res.send(rule);
    });
});

module.exports.create = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const rule = new Rules(req.body);

  rule.save();

  res.send(rule);
});
