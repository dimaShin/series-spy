
const async = require('asyncawait/async');
const await = require('asyncawait/await');

module.exports.get = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const rules = await(Rules.find().exec());

  console.log('rules: ', rules);
  res.send(rules);
});

module.exports.delete = async(function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  let _id = req.params._id;

  const rule = await(Rules.remove({_id: _id}).exec());
  console.log('rule: ', rule);

  res.sendStatus(200);
});
