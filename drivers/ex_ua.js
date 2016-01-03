'use strict';

class ExUaDriver {
  constructor () {
    "use strict";
    this.request = require('superagent');
    this.cheerio = require('cheerio');
    this.Promise = require('bluebird');
    this.URL = {
      base: 'http://www.ex.ua',
      foreignSerials: {
        url: '/ru/video/foreign_series',
        params: { r: 23755, pre: 200, p: 0 }
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
      self.request
        .get(url)
        .set('Cookie', 'ccid=6142029302196691130; mail_show=0; _ym_uid=1446579134698961487; uper=200; _ga=GA1.2.1692449598.1430052637; lastAds=1451751689; lastAfterPaus=1451751694; udpr=1')
        .set('User-Agent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36')
        .set('Upgrade-Insecure-Requests', 1)
        //.query(self.URL.foreignSerials.params)
        .accept('html')
        .redirects(0)
        .end(function (err, response) {
        "use strict";

        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        console.log('got response: ', response.req);
        const $ = self.cheerio.load(response.text);
        const tables = $('table');
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
              href: self.URL.base + href
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
    const episodeRegExp = new RegExp('(Серия|Cерия)\\s*(\\d*)\\s*(-\\s*(\\d*))?');
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
    const seasonRegExp = new RegExp('Сезон\\s*(\\d*)', 'i');
    const seasonMatch = title.match(seasonRegExp);

    if (!seasonMatch) {
      return null;
    }

    else return +seasonMatch[1];
  }

}

module.exports = ExUaDriver;