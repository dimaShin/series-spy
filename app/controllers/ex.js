// const async = require('asyncawait/async');
// const await = require('asyncawait/await');
const _ = require('lodash');
const ExDriver = require('./../drivers/ex_ua');
const exDriver = new ExDriver();

module.exports.get = async function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const rules = await Rules.find().exec();

  res.send(rules);
};

module.exports.delete = async function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');

  console.log('deleting rule: ', req.params._id);
  await Rules.findByIdAndRemove(req.params._id, err => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });

  res.sendStatus(200);
};

module.exports.update = async function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const data = _.pick(req.body, ['title', 'season', 'episode', 'ru', 'en']);
  const rule = await Rules.findOne({ _id: req.params._id }).exec();
  _.assign(rule, data);
  rule.save();
  res.send(rule);
};

module.exports.create = async function (req, res) {
  "use strict";
  const db = req.app.get('db');
  const Rules = db.model('ExRules');
  const rule = new Rules(req.body);

  rule.save();

  res.send(rule);
};

module.exports.parse = function (rules, ws) {
  "use strict";

  console.log(rules);
  rules.forEach(rule => {

    const ruRegExp = rule.ru && rule.ru.replace(/\s/g, '\\s*');
    const engRegExp = rule.en && rule.en.replace(/\s/g, '\\s*');

    if (ruRegExp && engRegExp) {
      rule.regExp = new RegExp(ruRegExp + '.*' + engRegExp, 'i');
    } else {
      rule.regExp = new RegExp(rule.title.replace(/\s/g, '\\s*'), 'i');
    }

    console.log(ruRegExp, engRegExp, rule.regExp);
  });

  //const parseLimitTimeout = setTimeout(() => {
  //  ws.send({
  //    status: 'TOO_LONG'
  //  });
  //}, 1000);

  exDriver.foreignSerials(rules)
    .then(matches => {
      //clearTimeout(parseLimitTimeout);
      ws.send(JSON.stringify({
        status: 'OK',
        result: matches
      }));
    })
    .catch(err => {
      //clearTimeout(parseLimitTimeout);
      ws.send({
        status: 'ERROR',
        error: err
      });
    });
};
