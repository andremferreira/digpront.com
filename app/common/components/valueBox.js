angular.module('digPront').component('valueBox', {
  bindings: {
    grid: '@',
    colorClass: '@',
    value: '@',
    text: '@',
    iconClass: '@'
  },
  controller: [
    'gridSystem',
    function(gridSystem) {
      this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
    }
  ],
  template: `
  <div class="{{ $ctrl.gridClasses }}">
    <div class="small-box {{ $ctrl.colorClass }}">
      <div class="inner">
        <h4><b>{{ $ctrl.value }}</b></h4>
        <p>{{ $ctrl.text }}</p>
      </div>
      <div class="icon">
        <h1><i class="{{ $ctrl.iconClass }}"></i></h1>
      </div>
    </div>
  </div>
  `
});
