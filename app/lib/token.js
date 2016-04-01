"use strict";
const jwt = require('jsonwebtoken');

class TokenManager{
  constructor() {
    this.secret = 'very_very_secret_phrase';
  }

  generate(tokenInfo) {
    return jwt.sign({
      generatedAt: Date.now(),
      userId: tokenInfo.userId,
      lifetime: tokenInfo.lifetime,
      expiredAt: tokenInfo.lifetime && Date.now() + tokenInfo.lifetime
    }, this.secret);
  }

  update(token) {
    let tokenInfo = jwt.verify(token, this.secret);
    return this.generate(tokenInfo);
  }
}

module.exports = () => {
  return new TokenManager();
};
