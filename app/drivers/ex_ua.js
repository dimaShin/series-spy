'use strict';
const EventEmitter = require('events').EventEmitter;
const messageBus = new EventEmitter();

class ExUaDriver {
  constructor () {
    "use strict";
    this.request = require('request');
    this.cheerio = require('cheerio');
    this.Promise = require('bluebird');

    //require('superagent-proxy')(this.request);

    this.URL = {
      base: 'http://www.ex.ua',
      foreignSerials: {
        url: '/ru/video/foreign_series',
        params: { pre: 200, p: 0, r: 23775 }
      }
    }
  }

  foreignSerials (rules) {
    "use strict";
    var self = this;

    return new Promise (function (resolve, reject) {
      "use strict";
      const url = self.URL.base + self.URL.foreignSerials.url;

      console.log('html will be loaded from: ', url);
      self.request({
        url: url,
        jar: true,
        proxy: process.env.PROXY && 'https://93.79.133.235:3128',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36',
          'Cookie': 'uper=200'
        }
      }, (err, response) => {
        "use strict";

        if (err) {
          console.log('error: ', err);
          reject('got response error: ', err.req);
          return;
        }
        //response
        const $ = self.cheerio.load(response.body);
        //const cards = ExUaDriver._toArray( $('table.include_0 td') );
        const tables = ExUaDriver._toArray( $('table') );
        console.log('got tables: ', tables.length);
        const cards = ExUaDriver._toArray( $(tables[5]).find('td') );
        const match = [];

        console.log('got cards: ', cards.length);
        cards.forEach(function (card) {
          "use strict";
          const img = $(card).find('img');
          const title = ExUaDriver._getCardTitle(img[0]);

          if (!title) {
            return;
          }

          const a = $(card).find('a');
          const href = ExUaDriver._getCardHref(a[0]);

          const rule = ExUaDriver._getRule(title, rules);

          if (rule) {
            console.log('got match', title);
            console.log('img: ', img);
            let season = ExUaDriver._getSeason(title);

            if (season !== null && (rule.season !== undefined && season < rule.season)) {
              console.log('season do not match: ', season, rule.season);
              return;
            }

            let episode = ExUaDriver._getEpisode(title);

            if (episode !== null && (rule.episode !== undefined && episode < rule.episode)) {
              console.log('episode do not match: ', episode, rule.episode);
              return;
            }
            match.push({
              title: title,
              episode: episode,
              season: season,
              href: self.URL.base + href,
              imgSrc: img[0].attribs.src
            });
          }
        });

        resolve(match);
      });
    });
  }

  static _toArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike, 0);
  }

  static _getCardTitle (img) {

    if (!img || !img.attribs.alt) {
      return null;
    }

    return img.attribs.alt;
  }

  static _getCardHref (a) {

    if (!a || !a.attribs.href) {
      return null;
    }

    return a.attribs.href;
  }

  static _getRule (string, rules) {
    "use strict";
    let result;

    rules.forEach(function (rule) {
      if (string.match(rule.regExp)) {
        result = rule;
        return false;
      }
    });

    return result;
  }

  static _getEpisode (title) {
    "use strict";
    const episodeRegExp = new RegExp('(Серия|Cерия|Серии)\\s*(\\d*)\\s*(-\\s*(\\d*))?');
    const episodeMatch = title.match(episodeRegExp);

    if (!episodeMatch) {
      return null;
    }

    if (episodeMatch[4]) {
      return +episodeMatch[4];
    }
    return +episodeMatch[2];
  }

  static _getSeason (title) {
    "use strict";
    const seasonRegExp = new RegExp('(Cезон|Сезон)\\s*(\\d*)', 'i');
    const seasonMatch = title.match(seasonRegExp);

    if (!seasonMatch) {
      return null;
    }

    else return +seasonMatch[2];
  }

}

module.exports = ExUaDriver;