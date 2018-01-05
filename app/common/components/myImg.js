angular.module('digPront').component('myImg', {
    bindings: {
      file:'@',
      class: '@',
      style: '@',
      alt: '@'
    },
    template: `
    <img src="/assets/imgs/{{ $ctrl.file }}" style="{{ $ctrl.style }}" class="img-circle" alt="{{ $ctrl.file }}" > 
    `
  })
  ;