const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.sigIn = function (req, res) {
  const db = req.get('db')
};

module.exports.signUp = function (req, res) {
  let db = req.get('db'),
    Users = db.model('Users');
  
};
