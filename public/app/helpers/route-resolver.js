import angular from 'angular';

class ResolveProvider {
  costructor() {
    
  }

  $get = {};

  getController(deps) {

    class Controller {
      constructor() {
        let depInstances = arguments;
        deps.forEach((dep, index) => {
          this[dep] = depInstances[index];
        });
        console.log(this);
      }
    }

    return Controller;
  }
}

export default angular.module('app.helpers.route-resolver', [])
  .provider('resolve', ResolveProvider)
  .name;
