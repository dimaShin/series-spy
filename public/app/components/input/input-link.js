import _ from 'lodash';

export default validator => {
  console.log('validator: ', validator.get);
  return ($scope, $el, $attrs) => {

    let $inputEl = $el.find('input');
    const validators = $scope.$eval($attrs.validators);

    $inputEl = $el.find('input');
    setTimeout(() => {
      if( $inputEl.val().trim() !== '' ) {
        $inputEl.parent().addClass('input--filled');
      }

      _.forIn(validators, (params, validatorName) => {
        $scope.modelCtrl.$validators[validatorName] = validator.get(validatorName)(params);
      });
      $scope.modelCtrl.$validate();
    }, 15);

    $inputEl.on( 'focus', () => {
      $inputEl.parent().addClass('input--filled');
    });

    $inputEl.on( 'blur', () => {
      if ($inputEl.val().trim() === '') {
        $inputEl.parent().removeClass('input--filled');
      }
    });
  }
}