"use strict";

class PolicyManager {
  constructor(app) {
    this.secret = 'very_very_secret_phrase';
    this.Users = app.get('db').model('Users');
    this.token = app.get('token');
    this.tokenKey = 'xx-token';
  }

  async middleware(req, res, next) {
    console.log('middleware: ', req.header(this.tokenKey));
    let token = req.header(this.tokenKey);
    let user = await this.getUserByToken(token);
    if (!user) {
      return res.sendStatus(401);
    }
    console.log('got user: ', user);
    user.token = this.token.update(token);
    user.save();
    req.user = user;
    res.setHeader(this.tokenKey, user.token);
    next();
  }

  async getUserByToken(token) {
    if (!token) {
      return null;
    }

    return await this.Users.findByToken(token);
  }

  addTokenToResponse(token, res) {
    return res.setHeader(this.tokenKey, token);
  }
}

module.exports = app => {
  return new PolicyManager(app);
};
