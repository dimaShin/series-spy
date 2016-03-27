import angular from 'angular';

class RulesModel {
  constructor($injector) {
    this.api = $injector.get('rulesApi');
  }

  get() {
    return [];
  }
}

export default angular.module('app.models.rules', [])
  .service('rules', RulesModel)
  .name;