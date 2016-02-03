'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/lib/mongodb');
const nodemailer = require('nodemailer');
const router = require('./app/lib/router');
const PORT = process.env.PORT || 8081;
const http = require('http');

const server = http.createServer(app);



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

server.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Start listening ' + PORT);
});

require('./app/lib/socket')(server);


