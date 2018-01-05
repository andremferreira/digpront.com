angular.module('digPront').controller('DashboardCtrl', [
  '$http',
  '$scope', 
  '$location',
  'consts',
  'tabs',
  'auth',
  DashboardController,
  
])


function DashboardController($http, $scope, $location, consts, tabs, auth) {
  const vm = this
  vm.getUser = () => auth.getUser()
  const usr = auth.getUser().medicoId
  vm.getSummary = function () {
    const url = `${consts.apiUrl}/billingSummary/${usr}`;
    $http.get(url).then(function (response) {
      const { credit = 0, debt = 0 } = response.data
      vm.credit = credit
      vm.debt = debt
      vm.total = credit - debt
    })
  }

  function widgetsController($scope, $route) {
    $scope.$route = $route;
  }

  vm.getSummary()

}
