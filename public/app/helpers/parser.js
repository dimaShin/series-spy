import angular from 'angular';

class Parser {
  static $inject = ['$injector'];
  constructor($injector) {
    const $location = $injector.get('$location');

    this.$q = $injector.get('$q');
    this._host = $location.absUrl().replace(/^http/, 'ws');
  }

  parse(rules) {
    const ws = new WebSocket(this._host);
    return this.$q((resolve, reject) => {
      this._waitForConnection(ws)
        .then(this._sendRules.bind(this, rules, ws))
        .then(resolve)
        .catch(reject)
    });
  }

  _sendRules(rules, ws) {
    const holdConnection = this._holdConnection(ws);

    return this.$q((resolve, reject) => {
      ws.send(angular.toJson(rules), { binary: true, mask: true });
      ws.onmessage = event => {
        console.log('event', event);
        const data = angular.fromJson(event.data);
        if (data.status === 'OK') {
          clearInterval(holdConnection);
          resolve(data.result);
        }
      };
    })
  }

  _holdConnection(ws) {
    return setInterval(()=> {
      ws.send('PING', { binary: true, mask: true });
    }, 25000);
  }

  _waitForConnection(ws, interval) {
    if (!angular.isDefined(interval)) {
      interval = 200;
    }

    return this.$q((resolve, reject) => {
      const interval = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(interval);
          return resolve()
        }
      }, interval);
    })
  }
}

export default angular.module('app.helpers.parser', [])
  .service('parser', Parser)
  .name;
