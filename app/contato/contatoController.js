angular.module('digPront').controller('ContatoCtrl', [
    '$http',
    '$scope', 
    '$location',
    'consts',
    'tabs',
    'msgs',
    'auth',
    'md5',
    ContatoController,
    
  ])
  
  
  function ContatoController($http, $scope, $location, consts, tabs, msgs, auth, md5) {
    const vm = this
    vm.getUser = () => auth.getUser()
    const nome = auth.getUser().nome 
    const email = auth.getUser().email 
    $scope.contato = {}
    $scope.sendMail = function (contato) {
      const url = `${consts.apiUrl}/contato`
      $scope.contato.nome = nome
      $scope.contato.email = email
      $scope.contato.titulo = contato.titulo
      $scope.contato.mensagem = contato.mensagem
      console.log($scope.contato, url)
      $http.post(url, $scope.contato).then(function (resp) {
          $scope.contato = {}
         msgs.addSuccess('Mensagem Enviada com Sucesso!')
       }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
   
    $scope.getMD5 = function(string){
      return md5.toEncrypt(string)
    }

  }
  