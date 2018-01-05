angular.module('digPront').controller('MeuPerfilCtrl', [
  '$scope',
  '$http',
  '$location',
  'msgs',
  'tabs',
  'consts',
  'auth',
  MeuPerfilController
])

function MeuPerfilController($scope, $http, $location, msgs, tabs, consts, auth) {
  const vm = this
  vm.getUser = () => auth.getUser()
  const usr = auth.getUser()._id
  const url = `${consts.apiUrl}/user/${usr}`
  $scope.getMeuPerfils = function () {
    $http.get(url).then(function (resp) {
      $scope.meuPerfil = {}
      $scope.meuPerfils = resp.data
      tabs.show($scope, { tabList: true })
    })
  }

  $scope.validar = function () {
    const emailRegex = /\S+@\S+\.\S+/
    if ($scope.meuPerfil) {
      // Validação do e-mail
      if ($scope.meuPerfil.email) {
        if (!$scope.meuPerfil.email.match(emailRegex)) {
          msgs.addError('O e-mail informado está inválido')
          return false
        } else {
          return true
        }
      }
    }
  }

  $scope.updateMeuPerfil = function () {
    const url = `${consts.apiUrl}/users/${$scope.meuPerfil._id}`
    $http.put(url, $scope.meuPerfil).then(function (response) {
      $scope.meuPerfil = {}
      $scope.getMeuPerfils()
      tabs.show($scope, { tabList: true })
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabUpdate = function (meuPerfil) {
    $scope.meuPerfil = meuPerfil
    tabs.show($scope, { tabUpdate: true })
  }

  $scope.showListAssistente = function (meuPerfil) {
    $scope.meuPerfil = meuPerfil
    tabs.show($scope, { tabListAssistente: true })
  }

  $scope.showAddAssistente = function (meuPerfil) {
    $scope.meuPerfil = meuPerfil
    tabs.show($scope, { tabFormAssistente: true })
  }

  $scope.cancel = function () {
    $scope.meuPerfil = {}
    $scope.getMeuPerfils()
    tabs.show($scope, { tabList: true })
  }

  $scope.alertaEmail = function () {
    msgs.addWarning('Ao modificar o e-mail, seu login de acesso será alterado para o mesmo email informado.')
  }

  $scope.validarAssistente = function () {
    var assistente = {}
    const emailRegex = /\S+@\S+\.\S+/
    if (assistente) {
      //console.log($scope.meuPerfil.assistente.nomeAssist)
      if (!$scope.meuPerfil.assistente.passAssist || !$scope.meuPerfil.assistente.passAssist.length) {
        msgs.addError('O atributo "Senha" é obrigatório. ')
        return false
      } else if (!$scope.meuPerfil.assistConfPass || !$scope.meuPerfil.assistConfPass.length) {
        msgs.addError('O atributo "Confirmação de senha" é obrigatório. ')
        return false
      } else if (!$scope.meuPerfil.assistente.emailAssist || !$scope.meuPerfil.assistente.emailAssist.length) {
        msgs.addError('O atributo "E-mail" é obrigatório.')
        return false
      } else if (!$scope.meuPerfil.assistente.nomeAssist || !$scope.meuPerfil.assistente.nomeAssist.length) {
        msgs.addError('O atributo "Nome" é obrigatório.')
        return false
      } else if (!$scope.meuPerfil.assistente.sobrenomeAssist || !$scope.meuPerfil.assistente.sobrenomeAssist.length) {
        msgs.addError('O atributo "Nome" é obrigatório.')
        return false
      } else if (!$scope.meuPerfil.assistente.emailAssist.match(emailRegex)) {
        msgs.addError('O E-mail informado é inválido.')
        return false
      } else {
        assistente.passAssist = $scope.meuPerfil.assistente.passAssist
        assistente.emailAssist = $scope.meuPerfil.assistente.emailAssist
        assistente.nomeAssist = $scope.meuPerfil.assistente.nomeAssist
        assistente.sobrenomeAssist = $scope.meuPerfil.assistente.sobrenomeAssist
        $scope.meuPerfil.assistente.push(assistente)
        return true
      }
    }
  }

  $scope.addFormAssistente = function () {
    if ($scope.validarAssistente()) {
      const url = `${consts.apiUrl}/users/${$scope.meuPerfil._id}`
      $http.put(url, $scope.meuPerfil).then(function (response) {
        $scope.showListAssistente()
        $scope.meuPerfil = response.data
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
  }

  $scope.excluirAssistente = function (meuPerfil, index) {
    //console.log(!meuPerfil.assistente || meuPerfil.assistente.length)
    if ($scope.meuPerfil.assistente.length != 1) {
      $scope.meuPerfil.assistente.splice(index, 1)
    } else {
      $scope.meuPerfil.assistente = []
    }
    const url = `${consts.apiUrl}/users/${$scope.meuPerfil._id}`
    $http.put(url, $scope.meuPerfil).then(function (response) {
      msgs.addSuccess('Operação realizada com sucesso!')
      $scope.showListAssistente($scope.meuPerfil)
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })

  }

  $scope.permissao = function () {
    if (auth.getUser().perfil == 2) {
      $scope.usr1 = false
      $scope.usr2 = true
      $scope.usr3 = false
      $scope.vencido = auth.getUser().vencido
    } else if (auth.getUser().perfil == 3) {
      $scope.usr1 = false
      $scope.usr2 = false
      $scope.usr3 = true
      $scope.vencido = auth.getUser().vencido
    } else {
      $scope.usr1 = true
      $scope.usr2 = false
      $scope.usr3 = false
      $scope.vencido = auth.getUser().vencido
    }
  }

  $scope.getMeuPerfils()
  $scope.permissao()
}