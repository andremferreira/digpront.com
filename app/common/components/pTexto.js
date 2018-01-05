angular.module('digPront').component('pTexto', {
    bindings: {
       texto: '@',
       stlT: '@',
       idT: '@',
       nameT: '@',
    },controller: [
     'pMaiuscula',
     function(pMaiuscula) {
       this.$onInit = () => this.pMaiusculaClasses = pMaiuscula.pUpper(this.texto)
     }
   ],
    template: `
        <p id="{{ $ctrl.idT }}" name="{{ $ctrl.nameT }}" style="{{ $ctrl.stlP }}" >{{ $ctrl.pMaiusculaClasses }}</p>
    `
 });
 