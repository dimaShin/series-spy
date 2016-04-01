'use strict';
const PORT = process.env.PORT || 8081;
const http = require('http');
const app = require('./app/app');
const server = http.createServer(app);
const socketManager = require('./app/lib/socket')(server);

app.configure({
  socketManager: socketManager
});

server.listen(PORT, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Start listening ' + PORT);
});


