"use strict";
class Parser {

  constructor () {
    "use strict";
    const ExUA = require('./ex_ua');
    const Kinosvit = require('./kinosvit');

    this.exUa = new ExUA();
    this.kinosvit = new Kinosvit();
  }

  parse (opt) {
    console.log(opt);
    "use strict";

    const driver = opt.driver;
    const method = opt.method;
    const rules = opt.rules;

    try {
      return this[driver][method](rules);
    } catch (err) {
      console.log(driver, method, this);
      throw(err);
    }

  }
}

module.exports = new Parser();

