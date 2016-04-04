"use strict";
const jwt = require('jsonwebtoken');

class TokenManager{
  constructor() {
    this.secret = 'very_very_secret_phrase';
  }

  generate(tokenInfo) {
    console.log('generating token: ', tokenInfo);
    return jwt.sign({
      generatedAt: Date.now(),
      userId: tokenInfo.userId,
      lifetime: tokenInfo.lifetime,
      expiredAt: tokenInfo.lifetime && Date.now() + tokenInfo.lifetime
    }, this.secret);
  }

  update(token) {
    console.log('update: ', token);
    let tokenInfo = this.parse(token);
    return this.generate(tokenInfo);
  }

  parse(token) {
    console.log('parsing: ', token);
    return jwt.verify(token, this.secret);
  }
}

module.exports = () => {
  return new TokenManager();
};
