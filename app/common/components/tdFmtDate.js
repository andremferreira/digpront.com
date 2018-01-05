angular.module('digPront').component('tdFmtDate', {
    bindings: {
      style: '@',
      text: '@'
    },
    controller: [
      'formatDate',
      function(formatDate) {
        this.$onInit = () => this.ftmDate = formatDate.toFormatDate(this.text)
      }
    ],
    template: `
     <h5 style="{{ $ctrl.style }}" ><i class="fa fa-calendar"></i> - {{ $ctrl.ftmDate }}</h5>
    `
  })
  ;
  