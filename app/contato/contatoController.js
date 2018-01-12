angular.module('digPront').controller('ContatoCtrl', [
    '$http',
    '$scope', 
    '$location',
    'consts',
    'tabs',
    'auth',
    ContatoController,
    
  ])
  
  
  function ContatoController($http, $scope, $location, consts, tabs, auth) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const email = auth.getUser().email 
    $scope.contato = {}
    $scope.sendMail = function (contato) {
      const url = `${consts.apiUrl}/contato`
      $scope.contato.email = email
      $scope.contato.titulo = contato.titulo
      $scope.contato.mensagem = contato.mensagem
      console.log($scope.contato, url)
      $http.post(url, $scope.contato).then(function (response) {
      //   $scope.meuPerfil = {}
      //   $scope.getMeuPerfils()
      //   tabs.show($scope, { tabList: true })
         msgs.addSuccess('Mensagem enviada com sucesso!')
       }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })

      // $http.get(url).then(function (response) {
      //   const { credit = 0, debt = 0 } = response.data

      // })
    }
  
  }
  