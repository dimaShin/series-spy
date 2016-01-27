'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/lib/mongodb');
const nodemailer = require('nodemailer');
const router = require('./app/lib/router');
const PORT = 8081;


//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackConfig = require('./webpack.config');
//const webpack = require('webpack');
//app.use(webpackDevMiddleware(compiler));
//const compiler = webpack(webpackConfig);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/dist/index.html');
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist'));
app.use(router);
app.set('db', db);

app.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Start listening ' + PORT);
});

app.get('/api/rules', (req, res) => {
  res.send([
    {
      id: 0,
      title: 'one'
    },
    {
      id: 1,
      title: 'two'
    }
  ]);
});
