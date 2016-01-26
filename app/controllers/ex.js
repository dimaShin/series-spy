
const async = require('asyncawait/async');
const await = require('asyncawait/await');

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
      res.sendStatus(401);
    }
  }));

  res.sendStatus(200);
});
