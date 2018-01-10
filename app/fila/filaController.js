angular.module('digPront').controller('FilaCtrl', [
  '$scope',
  '$http',
  '$window',
  '$location',
  '$filter',
  'msgs',
  'tabs',
  'consts',
  'auth',
  FilaController
])

function FilaController($scope, $http, $window, $location, $filter, msgs, tabs, consts, auth) {
  const vm = this
  vm.fl = false
  vm.fl2 = true
  vm.getUser = () => auth.getUser()
  const usr = auth.getUser().medicoId
  const dia = undefined
  const url = `${consts.apiUrl}/filaDia/${usr}/${dia}/`


  $scope.getFila = function () {
    $http.get(url).then(function (resp) {
      $scope.fila = {}
      $scope.filas = resp.data
      $scope.fila.dataFila = new Date()
      $scope.filas.disabled = getCondDay($scope.fila.dataFila) 
      tabs.show($scope, { tabList: true })
    })
  }

  $scope.aplFiltroFila = function () {

    if (!$scope.fila.dataFila) {
      // console.log('1')
      let periodo = undefined
      let urlFiltro = `${consts.apiUrl}/filaDia/${usr}/${periodo}/`
      $http.get(urlFiltro).then(function (resp) {
        $scope.filas = resp.data
        $scope.filas.disabled = true
        tabs.show($scope, { tabList: true })

      })
    } else {
      //  console.log('2')
      let periodo2 = new Date($scope.fila.dataFila).toISOString('yyyy-MM-dd')
      let urlFiltro2 = `${consts.apiUrl}/filaDia/${usr}/${periodo2}/`
      $http.get(urlFiltro2).then(function (resp) {
        $scope.filas = resp.data
        $scope.filas.disabled = getCondDay(periodo2) 
        //console.log($scope.filas.disabled)
        tabs.show($scope, { tabList: true })
      })
    }
  }

  $scope.aplFiltroFilaTime = function () {
      let periodo = undefined
      let urlFiltro = `${consts.apiUrl}/filaDia/${usr}/${periodo}/`
      $http.get(urlFiltro).then(function (resp) {
        $scope.filas = {}
        $scope.filas = resp.data
      })
    } 

  $scope.editFila = function () {
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

  $scope.delete = function (fila, $index) {
    var dia = $scope.fila.dataFila
    const url = `${consts.apiUrl}/fila/${fila._id}`
    $http.delete(url).then(function (resp) {
      $scope.fila = {}
      $scope.fila.dataFila = dia
      $scope.aplFiltroFila()
      msgs.addSuccess('Operação realizada com sucesso!')
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.atender = function (fila) {
    var dia = $scope.fila.dataFila
    $scope.paciente = {}
    $scope.paciente._id = fila.pacienteId
    const url = `${consts.apiUrl}/fila/${fila._id}`
    const url2 = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
    $scope.fila.atendido = true
    $http.put(url, $scope.fila).then(function (response) {
      $http.get(url2).then(function (resp) {
        $scope.paciente = {}
        $scope.paciente = resp.data
        $scope.paciente.idade = getAge($scope.paciente.dt_nascimento)
      })

      $scope.fila = {}
      $scope.fila.fl = true
      $scope.fila.disabled = getCondDay(dia) 
      $scope.fila.dataFila = dia
      tabs.show($scope, { tabConsulta: true })

      msgs.addSuccess('Atendimento iniciado com sucesso!')
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.visualizar = function (fila) {
    var dia = $scope.fila.dataFila
    $scope.paciente = {}
    $scope.paciente._id = fila.pacienteId
    const url2 = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
    $scope.fila.atendido = true
    $http.get(url2).then(function (resp) {
      $scope.paciente = {}
      $scope.paciente = resp.data
      $scope.paciente.idade = getAge($scope.paciente.dt_nascimento)
      $scope.fila = {}
      $scope.fila.fl = true
      $scope.fila.dataFila = dia
      tabs.show($scope, { tabConsulta: true })
    })
  }


  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function getCondDay(dateString) {
    var today = new Date()
    var dateInf = new Date(dateString)
    var d = parseInt(today.getUTCDate())
    var m = parseInt(today.getUTCMonth() + 1)
    var y = parseInt(today.getFullYear())
    var valDt = y + m + d
    var d2 = parseInt(dateInf.getUTCDate())
    var m2 = parseInt(dateInf.getUTCMonth() + 1)
    var y2 = parseInt(dateInf.getFullYear())
    var valDt2 = y2 + m2 + d2
    if (valDt2 < valDt) {
      return true;
    }else{
      return false
    }
  }

  $scope.cancelar = function (fila) {
    var dia = $scope.fila.dataFila
    const url = `${consts.apiUrl}/fila/${fila._id}`
    $scope.fila.atendido = false
    $http.put(url, $scope.fila).then(function (response) {
      $scope.fila = {}
      $scope.fila.dataFila = dia
      $scope.aplFiltroFila()
      msgs.addSuccess('Cancelamento realizada com sucesso!')
    }).catch(function (resp) {
      msgs.addError(resp.data.errors)
    })
  }

  $scope.showTabConsultaForm = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabFormConsulta: true })
  }

  $scope.detalhesConsulta = function (paciente, index, consulta) {
    $scope.consulta = {}
    $scope.consulta.index = index
    $scope.consulta.queixa = $scope.paciente.consultas[index].queixa
    $scope.consulta.anamnese = $scope.paciente.consultas[index].anamnese
    $scope.consulta.antecedente = $scope.paciente.consultas[index].antecedente
    $scope.consulta.alergia = $scope.paciente.consultas[index].alergia
    $scope.consulta.historicoFamiliar = $scope.paciente.consultas[index].historicoFamiliar
    $scope.consulta.exameFisico = $scope.paciente.consultas[index].exameFisico
    $scope.consulta.exameCompl = $scope.paciente.consultas[index].exameCompl
    $scope.consulta.conduta = $scope.paciente.consultas[index].conduta
    $scope.consulta.receitaMedica = $scope.paciente.consultas[index].receitaMedica
    $scope.consulta.dataConsulta = $filter('date')($scope.paciente.consultas[index].dataConsulta, 'dd/MM/yyyy HH:MM:ss')
    tabs.show($scope, { tabConsultaDetail: true })
  }

  $scope.cancelConsulta = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabConsulta: true })
  }

  $scope.editarConsulta = function (paciente, index, consulta) {
    $scope.consulta = {}
    $scope.consulta.index = index
    $scope.consulta.queixa = $scope.paciente.consultas[index].queixa
    $scope.consulta.anamnese = $scope.paciente.consultas[index].anamnese
    $scope.consulta.antecedente = $scope.paciente.consultas[index].antecedente
    $scope.consulta.alergia = $scope.paciente.consultas[index].alergia
    $scope.consulta.historicoFamiliar = $scope.paciente.consultas[index].historicoFamiliar
    $scope.consulta.exameFisico = $scope.paciente.consultas[index].exameFisico
    $scope.consulta.exameCompl = $scope.paciente.consultas[index].exameCompl
    $scope.consulta.conduta = $scope.paciente.consultas[index].conduta
    $scope.consulta.receitaMedica = $scope.paciente.consultas[index].receitaMedica
    tabs.show($scope, { tabFormConsultaAlterar: true })
  }

  $scope.duplicarConsulta = function (paciente, index, consulta) {
    $scope.consulta = {}
    $scope.consulta.index = index + 1
    $scope.consulta.queixa = $scope.paciente.consultas[index].queixa
    $scope.consulta.anamnese = $scope.paciente.consultas[index].anamnese
    $scope.consulta.antecedente = $scope.paciente.consultas[index].antecedente
    $scope.consulta.alergia = $scope.paciente.consultas[index].alergia
    $scope.consulta.historicoFamiliar = $scope.paciente.consultas[index].historicoFamiliar
    $scope.consulta.exameFisico = $scope.paciente.consultas[index].exameFisico
    $scope.consulta.exameCompl = $scope.paciente.consultas[index].exameCompl
    $scope.consulta.conduta = $scope.paciente.consultas[index].conduta
    $scope.consulta.receitaMedica = $scope.paciente.consultas[index].receitaMedica
    tabs.show($scope, { tabFormConsultaDpl: true })
  }

  $scope.editFormConsultaDpl = function () {
    if ($scope.validarConsultaDpl()) {
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.showTabConsulta()
        $scope.paciente = response.data
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
  }

  $scope.limpar = function (campo) {
    switch (campo) {
      case 'queixa':
        $scope.paciente.consultas.queixa = null;
        $scope.consulta.queixa = null;
        break;
      case 'anamnese':
        $scope.paciente.consultas.anamnese = null;
        $scope.consulta.anamnese = null;
        break;
      case 'antecedente':
        $scope.paciente.consultas.antecedente = null;
        $scope.consulta.antecedente = null;
        break;
      case 'alergia':
        $scope.paciente.consultas.alergia = null;
        $scope.consulta.alergia = null;
        break;
      case 'historicoFamiliar':
        $scope.paciente.consultas.historicoFamiliar = null;
        $scope.consulta.historicoFamiliar = null;
        break;
      case 'exameFisico':
        $scope.paciente.consultas.exameFisico = null;
        $scope.consulta.exameFisico = null;
        break;
      case 'exameCompl':
        $scope.paciente.consultas.exameCompl = null;
        $scope.consulta.exameCompl = null;
        break;
      case 'conduta':
        $scope.paciente.consultas.conduta = null;
        $scope.consulta.conduta = null;
        break;
      case 'receitaMedica':
        $scope.paciente.consultas.receitaMedica = null;
        $scope.consulta.receitaMedica = null;
        break;
    }
  }

  $scope.validarConsultaDpl = function (paciente, index, consulta) {
    var consult = {}
    if (consult) {
      if (!$scope.consulta.queixa || !$scope.consulta.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else if (!$scope.consulta.anamnese || !$scope.consulta.anamnese.length) {
        msgs.addError('O atributo "Anamnese" é obrigatório. ')
        return false
      } else {
        //console.log($scope.consulta, $scope.consulta.index)
        $scope.paciente.consultas.push($scope.consulta)
        return true
      }
    }
  }

  $scope.addConsultaBtn = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabFormConsulta: true })
  }

  $scope.addFormConsulta = function () {
    if ($scope.validarConsulta()) {
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.showTabConsulta()
        $scope.paciente = response.data
        if (!$scope.paciente.idade) {
          $scope.paciente.idade = getAge($scope.paciente.dt_nascimento)
        }
        msgs.addSuccess('Operação realizada com sucesso!')
      })
      // .catch(function (resp) {
      //   msgs.addError(resp.data.errors)
      // })
    }
  }

  $scope.validarConsulta = function () {
    var consult = {}
    if (consult) {
      if (!$scope.paciente.consultas.queixa || !$scope.paciente.consultas.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else if (!$scope.paciente.consultas.anamnese || !$scope.paciente.consultas.anamnese.length) {
        msgs.addError('O atributo "Anamnese" é obrigatório. ')
        return false
      } else {
        consult.queixa = $scope.paciente.consultas.queixa
        consult.anamnese = $scope.paciente.consultas.anamnese
        if (!$scope.paciente.consultas.alergia || $scope.paciente.consultas.alergia.length) {
          consult.alergia = null
        } else {
          consult.alergia = $scope.paciente.consultas.alergia
        }
        if (!$scope.paciente.consultas.antecedente || $scope.paciente.consultas.antecedente.length) {
          consult.antecedente = null
        } else {
          consult.antecedente = $scope.paciente.consultas.antecedente
        }
        if (!$scope.paciente.consultas.conduta || $scope.paciente.consultas.conduta.length) {
          consult.conduta = null
        } else {
          consult.conduta = $scope.paciente.consultas.conduta
        }
        if (!$scope.paciente.consultas.exameCompl || $scope.paciente.consultas.exameCompl.length) {
          consult.exameCompl = null
        } else {
          consult.exameCompl = $scope.paciente.consultas.exameCompl
        }
        if (!$scope.paciente.consultas.historicoFamiliar || $scope.paciente.consultas.historicoFamiliar.length) {
          consult.historicoFamiliar = null
        } else {
          consult.historicoFamiliar = $scope.paciente.consultas.historicoFamiliar
        }
        if (!$scope.paciente.consultas.receitaMedica || $scope.paciente.consultas.receitaMedica.length) {
          consult.receitaMedica = null
        } else {
          consult.receitaMedica = $scope.paciente.consultas.receitaMedica
        }
        $scope.paciente.consultas.push(consult)
        return true
      }
    }
  }

  $scope.validarConsultaEdit = function (paciente, index, consulta) {
    var consult = {}
    if (consult) {
      if (!$scope.consulta.queixa || !$scope.consulta.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else if (!$scope.consulta.anamnese || !$scope.consulta.anamnese.length) {
        msgs.addError('O atributo "Anamnese" é obrigatório. ')
        return false
      } else {
        //console.log($scope.consulta, $scope.consulta.index)
        $scope.paciente.consultas.splice($scope.consulta.index, 1, $scope.consulta)
        return true
      }
    }
  }

  $scope.validarConsultaDpl = function (paciente, index, consulta) {
    var consult = {}
    if (consult) {
      if (!$scope.consulta.queixa || !$scope.consulta.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else if (!$scope.consulta.anamnese || !$scope.consulta.anamnese.length) {
        msgs.addError('O atributo "Anamnese" é obrigatório. ')
        return false
      } else {
        //console.log($scope.consulta, $scope.consulta.index)
        $scope.paciente.consultas.push($scope.consulta)
        return true
      }
    }
  }

  $scope.showTabConsulta = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabConsulta: true })
  }

  $scope.editFormConsulta = function () {
    if ($scope.validarConsultaEdit()) {
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.showTabConsulta()
        $scope.paciente = response.data
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
  }

  $scope.cancel = function () {
    var dia = $scope.fila.dataFila
    $scope.paciente = {}
    $scope.fila = {}
    $scope.fila.dataFila = dia
    $scope.aplFiltroFila()
    tabs.show($scope, { tabList: true })
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
  
  $scope.reloadFila = function(usr3) {
    let loc = $location.path()
    if (usr3 && loc == "/fila"){
      //  console.log($location.path())
       setTimeout(function(){window.location.reload()}, 60000)
    }    
  }

  $scope.getFila()
  $scope.permissao()
  $scope.reloadFila($scope.usr3)
}