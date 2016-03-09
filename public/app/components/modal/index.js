import angular from 'angular';

import modalService from './modal-service';
import modalComponent from './base/base';

import header from './header/modal-header';
import confirm from './confirm/confirm-modal';

export default angular.module('app.components.modal', [
  modalComponent,
  header,
  confirm
])
  .service('modal', modalService)
  .name;
