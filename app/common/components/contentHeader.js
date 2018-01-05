angular.module('digPront').component('contentHeader', {
   bindings: {
      name: '@',
      small: '@',
      imagem: '@',
      icoimgsP: '@',
      txtPosIco: '@',
      icoimgs: '@',
      preInf: '@',
      posInf: '@',
      tabTitle:'@',
      stlI: '@',
      tituloLocation: '@',
   },controller: [
    'pMaiuscula',
    function(pMaiuscula) {
      this.$onInit = () => this.pMaiusculaClasses = pMaiuscula.pUpper(this.small)
    }
  ],
   template: `
   <section class="content-header">
   <h1><i class="{{ $ctrl.icoimgsP }}" style="{{ $ctrl.stlI}} "></i>{{ $ctrl.txtPosIco }}{{ $ctrl.name }}
   <small><i class="{{ $ctrl.icoimgs}}"></i>{{ $ctrl.preInf }}{{ $ctrl.pMaiusculaClasses }}{{ $ctrl.posInf }}</small></h1>
   </h1>
   <ol class="breadcrumb">
       <li>
           <a href="#">
               <i class="fa fa-dashboard"></i> Home</a>
       </li>
       <li class="active"> {{ $ctrl.tituloLocation }}</li>
   </ol>
</section>
   `
});
