'use strict';

class Helpers {
  constructor () {

  }

  static getCompiledEmailTpl (opts) {
    console.log('Getting tpl: ', opts);
    const handlebars = require('handlebars');
    const fs = require('fs');
    const emailTplString = fs.readFileSync(opts.path).toString();

    return handlebars.compile(emailTplString);
  }
}

module.exports = Helpers;
