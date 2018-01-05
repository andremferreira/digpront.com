angular.module('digPront').component('tdFmtStyle', {
    bindings: {
      style: '@',
      text: '@'
    },
    template: `
     <td style="{{ $ctrl.style }}">{{ $ctrl.text }}</td>
    `
  })
  ;