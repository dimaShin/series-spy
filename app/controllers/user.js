const async = require('asyncawait/async');
const await = require('asyncawait/await')

module.exports.create = function (req, res) {
  let db = req.get('db'),
    Users = db.model('Users'),
    user = User.create(req.data),
    token = 'this is very secret token'.toBase64();

  req.send({
    token: token,
    data: user
  });
};
