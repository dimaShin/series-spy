'use strict';
const _ = require('lodash');
const handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');

class Mailer {
  constructor (opts) {
    _.assign(this, opts);
  }

  static getTpl (tplPath, data) {
    const tpl = fs.readFileSync(tplPath).toString();
    const hbs = handlebars.compile(tpl);
    return hbs( {series: data} );
  }
  send (opts) {
    console.log('sending email...', opts);
    const transporter = nodemailer.createTransport('smtps://yadmitriy%40gmail.com:ntaeaj166823325@smtp.gmail.com');
    const defaultOptions = {
      from: 'No Reply <noreply@series-spy.com>', // sender address
      to: 'yadmitriy@gmail.com, dmitri_shin@list.ru', // list of receivers
      subject: 'Series Spy Notification', // Subject line,
      text: 'Please, open this message in modern mailer',
      html: Mailer.getTpl(opts.tplPath, opts.data)
    };

    const mailOptions = _.defaults(opts.mailOptions || {}, defaultOptions);

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log('Error while sending email: ', error);
        return;
      }
      console.log(info);
    });
  }
}

module.exports = new Mailer();
