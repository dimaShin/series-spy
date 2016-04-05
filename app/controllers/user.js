"use strict";
let BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor() {
    super(arguments);
    this.actions = {
      get: this.get.bind(this),
      save: this.save.bind(this),
      create: this.create.bind(this)
    }
  }

  async create(req, res) {
    return res.sendStatus(this.HTTP_STATUS.NOT_IMPLEMENTED);
  }

  async get(req, res) {
    let userId = req.params._id;
    let Users = req.app.get('db').model('Users');

    if (!userId) {
      res.sendStatus(this.HTTP_STATUS.BAD_REQUEST);
    }

    let user = await Users.findOne({ _id: userId });
    console.log('user: ', user);

    res.send(user);
  }

  async save(req, res) {
    let user = req.body;

    console.log('save user: ', user);

    let Users = req.app.get('db').model('Users');

    user = await Users.findAndModify({ _id: user._id } , user, { new: true });

    console.log('user updated: ', user);
    res.send(user);
  }
}

let userController = new UserController();

module.exports = userController.actions;
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');

// module.exports.create = function (req, res) {
//   let db = req.get('db'),
//     Users = db.model('Users'),
//     user = User.create(req.data),
//     token = 'this is very secret token'.toBase64();
//
//   req.send({
//     token: token,
//     data: user
//   });
// };

// module.exports.get = async function (req, res) {
//   let userId = req.params._id;
//   let Users = req.app.get('db').model('Users');
//
//   if (!userId) {
//     res.sendStatus(400);
//   }
//
//   let user = await Users.findOne({ _id: userId });
//   console.log('user: ', user);
//
//   res.send(user);
// };

// module.exports.save = async function (req, res) {
//   let user = req.body;
//
//   console.log('save user: ', user);
//
//   let Users = req.app.get('db').model('Users');
//
//   user = await Users.findAndModify({ _id: user._id } , user, { new: true });
//
//   console.log('user updated: ', user);
//   res.send(user);
// };
