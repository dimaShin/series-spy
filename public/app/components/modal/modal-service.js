export default class ModalService {
  constructor($injector) {
    'ngInject';
    this.$document = $injector.get('$document');
    this.$rootScope = $injector.get('$rootScope');
    this.$compile = $injector.get('$compile');
    this.$q = $injector.get('$q');

    this._init()
  }

  _init() {
    const body = this.$document.find('body');
    body.append('<modal-container class="modal-wrapper"></modal-container>');
    this.wrp = body.find('modal-container');
  }

  open(params) {
    if (!params.scope) {
      params.scope = this.$rootScope.$new();
    }

    params.scope.message = params.message;
    params.scope.dismiss = this.dismiss.bind(this);
    params.scope.close = this.close.bind(this);

    const compiledTemplate = this.$compile(params.template)(params.scope);

    this.wrp.append(compiledTemplate);
    this.wrp.addClass('open');

    return this.$q((resolve, reject) => {
      this.$rootScope.$on('modal:dismiss', ($event, result) => {
        reject(result);
      });

      this.$rootScope.$on('modal:close', ($event, data) => {
        resolve(data);
      })
    })
  }

  dismiss(reason) {
    console.log('dismiss');
    this.wrp.removeClass('open');
    this.wrp.empty();
    this.$rootScope.$emit('modal:dismiss', reason);
  }

  close(data) {
    console.log('close');
    this.wrp.removeClass('open');
    this.wrp.empty();
    this.$rootScope.$emit('modal:close', data);
  }
}


