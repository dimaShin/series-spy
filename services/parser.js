"use strict";
class Parser {

  constructor () {
    "use strict";
    const ExUA = require('../drivers/ex_ua');

    this.exUa = new ExUA();
  }

  parse (opt) {
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

