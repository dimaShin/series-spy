export default class RuleRowController {
  constructor($state){
    'ngInject';
    this.$state = $state;
  }

  edit(rule) {
    console.log('go: ', rule);
    this.$state.go('show', rule);
  }
}