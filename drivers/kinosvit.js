'use strict';

class KinosvitDriver {
  constructor () {
    this.request = require('superagent-charset');
    this.cheerio = require('cheerio');
    this.Promise = require('bluebird');
    this.URL = {
      base: 'http://kinosvit.tv',
      last: '/tags/2015/'
    }
  }

  last (rules) {

    return new this.Promise ( (resolve, reject) => {
      const url = this.URL.base + this.URL.last;

      this.request
        .get(url)
        .accept('html')
        .charset('utf8')
        .redirects(0)
        .end((err, resp) => {

          const $ = this.cheerio.load(resp.text);
          const midside = $('#midside');
          const cards = Array.prototype.slice.call($(midside).find('.maincont'), 0);

          cards.forEach(card => {
            card.children.forEach(el => {
              if (el.type === 'text') {
                return;
              }
              console.log($(el).html());
            });
          });
        });
    });

  }
}

module.exports = KinosvitDriver;