"use strict";
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const _ = require('lodash');

module.exports.sigIn = async(function (req, res) {
  const token = req.body.token;

  if (!token) {
    return res.sendStatus(401);
  }

  const db = req.get('db')
});

module.exports.signUp = async(function (req, res) {
  let db = req.app.get('db'),
    Users = db.model('Users'),
    user;

  if (req.body.providerUserId && req.body.providerType) {
    user = await(Users.findOrCreate({
      providerUserId: req.body.providerUserId,
      providerType: req.body.providerType
    }));
  } else {
    user = Users({});
  }
  
  _.assign(user, {
    shows: req.body.shows || [],
    jobs: req.body.jobs || [],
    email: req.body.email || null,
    password: req.body.password || null,
    providerData: req.body.providerData || null,
    providerUserId: req.body.providerUserId || null,
    providerType: req.body.providerType || null,
    token: null
  });

  if (req.body.providerData) {
    user.token = req.app.get('token').generate({
      userId: user._id,
      lifetime: null
    });

    req.app.get('policy').addTokenToResponse(user.token, res);
  }

  console.log('user created: ', user);
  user.save();

  res.send(user);
  
});
