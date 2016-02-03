const WebSocketServer = require('ws').Server;
const exCtrl = require('./../controllers/ex');

module.exports = server => {
  "use strict";
  const wss = new WebSocketServer({ server: server });

  wss.on("connection", function(ws) {
    console.log("websocket connection open");

    ws.on('message', rules => {
      if (rules === 'PING') {
        console.log('PING');
        return;
      }
      console.log('starting timeout');
      setTimeout(() => {
        console.log('start parsing');
        exCtrl.parse(JSON.parse(rules), ws);
      }, 120000);

    });
  });
};
