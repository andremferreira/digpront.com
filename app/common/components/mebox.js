angular.module('digPront').component('mebox', {
  bindings: {
    titulo: '@',
    titlep: '@',
    textp: '@',
    titles: '@',
    texts: '@',
    titless: '@',
    textss: '@',
    icoimgs: '@',
    imagem: '@',
    grid: '@'
  },
  controller: [
    'gridSystem',
    function (gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
    }
  ],
  template: `
  <div class="{{ $ctrl.gridClasses }}"  style"margin-right: 2cm; padding-right:60px;">
    <div class="box box-solid">
      <div class="box-header with-border">
          <i class="{{ $ctrl.icoimgs }}"></i>
          <h1 class="box-title">{{ $ctrl.titulo }}</h1>
      </div>     
      <div class="box-body">
          <img src="{{ $ctrl.imagem }}">
          <br>
          <h4>{{ $ctrl.titlep }}</h4>
          <h5>{{ $ctrl.textp }}</h5>
          <br>
          <h4>{{ $ctrl.titles }}</h4>
          <h5>{{ $ctrl.texts }}</h5>
          <br>
          <h4>{{ $ctrl.titless }}</h4>
          <h5>{{ $ctrl.textss }}</h5>
      </div>
    </div>
</div>
  `
});
