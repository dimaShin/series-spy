import _ from 'lodash';

export default Validator => {
  return ($scope, $el, $attrs) => {

    let $inputEl = $el.find('input');
    const validators = $scope.$eval($attrs.validators);

    $inputEl = $el.find('input');
    setTimeout(() => {
      if( $inputEl.val().trim() !== '' ) {
        $inputEl.parent().addClass('input--filled');
      }

      _.forIn(validators, (params, validator) => {
        $scope.modelCtrl.$validators[validator] = Validator.get(validator)(params);
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