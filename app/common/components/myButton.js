angular.module('digPront').component('myButton', {
  bindings: {
    imgIcon: '@',
    btnStyle: '@',
    click: '@',
    text: '@',
    disabled: '<',
    condicao: '<',
    style: '@'
  },
  template: `
    <button style="{{ $ctrl.style }}" class="{{ $ctrl.btnStyle }}" ng-click="$ctrl.click" ng-disabled="$ctrl.disabled" ng-if="$ctrl.condicao"> 
        <i class="{{ $ctrl.imgIcon }}"></i>{{ $ctrl.text }}
    </button>
  `
});
