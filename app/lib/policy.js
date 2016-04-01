"use strict";

class PolicyManager {
  constructor(app) {
    this.secret = 'very_very_secret_phrase';
    this.Users = app.get('db').model('Users');
    this.token = app.get('token');
    this.tokenKey = 'xx-token';
  }

  middleware(req, res, next) {
    let user = this.getUserByToken(req.header(this.tokenKey));
    if (!user) {
      return res.sendStatus(401);
    }

    user.token = this.token.update(user.token);
    user.save();
    req.user = user;
    res.setHeader(this.tokenKey, user.token);
    next();
  }

  getUserByToken(token) {
    if (!token) {
      return null;
    }

    return this.Users.findByToken(token);
  }

  addTokenToResponse(token, res) {
    return res.setHeader(this.tokenKey, token);
  }
}

module.exports = app => {
  return new PolicyManager(app);
};
