import angular from 'angular';
import _ from 'lodash';

export const controller = 'InputCtrl';
export const controllerAs = 'iCtrl';

class InputCtrl {

  constructor($scope, $element) {
    'ngInject';

    const defaults = {
      type: 'text',
      id: $scope.label,
      name: $scope.label
    };

    _.assign($scope, defaults);

    const $input = $element.find('input');
  }




}


export default angular.module('app.components.input.ctrl', [])
  .controller(controller, InputCtrl)
  .name;
