"use strict";
const _ = require('lodash');
const WebSocketServer = require('ws').Server;
const exCtrl = require('./../controllers/ex');

class SocketManager {
  constructor(httpServer) {
    this.wss = new WebSocketServer({ server: httpServer });
    this.connections = [];

    this.init();
  }

  init() {
    this.wss.on('connection', ws => {
      console.log("websocket connection open");
      this.connections.push(ws);

      this.ping(ws);
    });
  }

  ping(ws) {
    const pingInterval = 29000; //29 seconds
    let interval = setInterval(() => {
      if (ws.readyState === ws.CLOSED) {
        clearInterval(interval);
        return this.removeConnection(ws);
      }

      ws.ping();
    }, pingInterval);

    ws.onclose(() => {
      this.removeConnection(ws);
      clearInterval(interval);
    });
  }

  removeConnection(ws) {
    return _.remove(this.connections, ws);
  }
}

module.exports = (httpServer) => {
  return new SocketManager(httpServer);
};

// module.exports = server => {
//   "use strict";
//
//   wss.on("connection", function(ws) {
//     console.log("websocket connection open");
//
//     ws.on('message', rules => {
//       if (rules === 'PING') {
//         console.log('PING');
//         return;
//       }
//
//       console.log('start parsing');
//       exCtrl.parse(JSON.parse(rules), ws);
//
//     });
//   });
// };
