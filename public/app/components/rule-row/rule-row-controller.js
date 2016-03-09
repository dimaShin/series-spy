import _ from 'lodash';

export default class RuleRowController {
  constructor($state, modal, user){
    'ngInject';
    this.$state = $state;
    this.modal = modal;
    this.user = user;
  }

  edit(rule) {
    this.$state.go('show', rule);
  }

  delete(rule) {
    this.modal.open({
      plain: true,
      template: '<confirm-modal ' +
        'dismiss="this.dismiss"' +
        'close="this.close"' +
        'message="this.message"' +
      '></confirm-modal>',
      message: `Are you sure you want to delete ${rule.title}?`
    }).then(() => {
      _.remove(this.user.rules, {_id: rule._id});
      rule.$delete();
    }).catch(() => {
      console.log('modal dismissed');
    });
  }
}