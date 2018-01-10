angular.module('digPront').controller('PacienteCtrl', [
  '$scope',
  '$http',
  '$filter',
  '$location',
  '$window',
  'msgs',
  'tabs',
  'consts',
  'auth',
  PacienteController
])

function PacienteController($scope, $http, $filter, $location, $window, msgs, tabs, consts, auth) {
  const vm = this
  vm.getUser = () => auth.getUser()
  vm.fl = true
  vm.fl2 = false
  const usr = auth.getUser().medicoId
  const limit = parseInt(30)
  const page = parseInt($location.search().page) || 1
  const url = `${consts.apiUrl}/cadastroPacientes/${usr}/${limit}/${(page - 1) * limit}`
  const url2 = `${consts.apiUrl}/cadastroPacientesQtd/${usr}`
  const nome = $location.search().nome || undefined
  const sobrenome = $location.search().sobrenome || undefined
  const limpar = $location.search().limpar || false
  $scope.consulta = {}
  $scope.paciente = {}
  $scope.fila = {}
  $scope.fila.fl = false
  $scope.paciente.nome = $location.search().nome || undefined
  $scope.paciente.sobrenome = $location.search().sobrenome || undefined
  //console.log($scope.paciente.nome , $scope.paciente.sobrenome)
  if (!$location.search().nome || !$location.search().sobrenome) {
    $scope.paciente.limpar = true
  } else {
    $scope.paciente.limpar = false
  }

  $scope.getPacientes = function () {

    if (nome || sobrenome) {
      //console.log('dentro if filtro if' ,nome, sobrenome)
      const url3 = `${consts.apiUrl}/cadastroPacientes/${usr}/${limit}/${(page - 1) * limit}/${nome}/${sobrenome}`
      const url4 = `${consts.apiUrl}/cadastroPacientesQtd/${usr}/${nome}/${sobrenome}`
      $http.get(`${url3}`).then(function (resp) {
        $scope.paciente = {}
        $scope.pacientes = resp.data
        $http.get(`${url4}`).then(function (resp) {
          $scope.pages = {}
          $scope.pages = Math.ceil(resp.data.value / limit)
          $scope.paciente.nome = $location.search().nome || undefined
          $scope.paciente.sobrenome = $location.search().sobrenome || undefined
          $scope.paciente.limpar = $location.search().limpar || undefined
          tabs.show($scope, { tabList: true, tabCreate: true })
        })
      })
    } else if (($scope.paciente.nome || $scope.paciente.sobrenome) && !$scope.paciente.limpar == true) {
      //console.log('dentro elseif filtro' ,$scope.paciente.nome, $scope.paciente.sobrenome)
      var fil1 = $scope.paciente.nome
      var fil2 = $scope.paciente.sobrenome
      var fil3 = $scope.paciente.limpar
      const url3 = `${consts.apiUrl}/cadastroPacientes/${usr}/${limit}/${(page - 1) * limit}/${fil1}/${fil2}`
      const url4 = `${consts.apiUrl}/cadastroPacientesQtd/${usr}/${fil1}/${fil2}`
      $http.get(`${url3}`).then(function (resp) {
        $scope.paciente = {}
        $scope.paciente.nome = fil1 || undefined
        $scope.paciente.sobrenome = fil2 || undefined
        $scope.paciente.limpar = fil3 || false
        $scope.pacientes = resp.data
        $http.get(`${url4}`).then(function (resp) {
          $scope.pages = {}
          $scope.pages = Math.ceil(resp.data.value / limit)
          tabs.show($scope, { tabList: true, tabCreate: true })
        })
      })
    } else {
      //console.log('dentro if filtro else' ,nome, sobrenome)
      $http.get(`${url}`).then(function (resp) {
        $scope.paciente = {}
        $scope.pacientes = resp.data
        $http.get(`${url2}`).then(function (resp) {
          $scope.pages = Math.ceil(resp.data.value / limit)
          $scope.paciente.nome = $location.search().nome
          $scope.paciente.sobrenome = $location.search().sobrenome
          $scope.paciente.limpar = false
          tabs.show($scope, { tabList: true, tabCreate: true })
        })
      })
    }
  }

  $scope.limparFiltro = function () {
    $location.search().sobrenome = undefined
    $location.search().nome = undefined
    $location.search().limpar = false
    $scope.getPacientes()
  }

  $scope.aplicarFiltro = function () {
    //console.log('AplicarFiltro')
    $scope.getPacientes()
  }

  $scope.validar = function () {
    const emailRegex = /\S+@\S+\.\S+/
    if ($scope.paciente) {
      // Validação do e-mail
      if ($scope.paciente.email || $scope.paciente.email.length) {
        //console.log($scope.paciente.email)
        if (!$scope.paciente.email.match(emailRegex)) {
          msgs.addError('O e-mail informado está inválido')
          return false
        } else {
          return true
        }
      }
    }
  }

  function valid(strg) {
    const emailRegex = /\S+@\S+\.\S+/
    //console.log(strg)
    if (strg === undefined ) {
      return false
    } else if(!strg.match(emailRegex )) {
      return false 
    } else {
      return true
    }
  }

  $scope.validarConsulta = function () {
    var consult = {}
    if (consult) {
      if (!$scope.paciente.consultas.queixa || !$scope.paciente.consultas.queixa.length) {
        msgs.addError('O atributo "Queixa" é obrigatório. ')
        return false
      } else {
        consult.queixa = $scope.paciente.consultas.queixa
        consult.anamnese = $scope.paciente.consultas.anamnese
        if (!$scope.paciente.consultas.anamnese || $scope.paciente.consultas.anamnese.length) {
          consult.anamnese = null
        } else {
          consult.alergia = $scope.paciente.consultas.alergia
        }        
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
      } else {
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
      } else {
        //console.log($scope.consulta, $scope.consulta.index)
        $scope.paciente.consultas.push($scope.consulta)
        return true
      }
    }
  }

  $scope.createPaciente = function () {
    var medico = auth.getUser().medicoId
    const url = `${consts.apiUrl}/cadastroPaciente`
    //console.log($scope.consulta.check)
    $scope.paciente.medicoId = auth.getUser().medicoId
    $http.post(url, $scope.paciente).then(function (response) {
      $scope.paciente = response.data
      $scope.paciente.idade = getAge($scope.paciente.dt_nascimento)
      //console.log($scope.paciente)
      if ($scope.consulta.check) {
          tabs.show($scope, { tabFormConsulta: true })          
          msgs.addSuccess('Operação realizada com sucesso!!')
      }else{
        $scope.paciente = {}
        $scope.getPacientes()
        msgs.addSuccess('Operação realizada com sucesso!!')
        tabs.show($scope, { tabList: true, tabCreate: true })}
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })

  }

  $scope.updatePaciente = function () {
    //console.log($scope.paciente.email)
    if ( valid($scope.paciente.email) ) {
      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
      let strToUpper = new String
      strToUpper = $scope.paciente.nome.toUpperCase()
      $scope.paciente.nome = strToUpper
      strToUpper = $scope.paciente.sobrenome.toUpperCase()
      $scope.paciente.sobrenome = strToUpper
      $scope.paciente.dt_nascimento = new Date($scope.paciente.dt_nascimento.replace(pattern, '$3-$2-$1'))
      const url = `${consts.apiUrl}/cadastroPaciente/${$scope.paciente._id}`
      $http.put(url, $scope.paciente).then(function (response) {
        $scope.paciente = {}
        $scope.getPacientes()
        tabs.show($scope, { tabList: true, tabCreate: true })
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    } else {
      msgs.addError('O e-mail informado está inválido')
    }
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
      }).catch(function (resp) {
        msgs.addError(resp.data.errors)
      })
    }
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

  $scope.showTabUpdate = function (paciente) {
    $scope.paciente = paciente
    $scope.paciente.dt_nascimento = $filter('date')(paciente.dt_nascimento, 'dd/MM/yyyy')
    tabs.show($scope, { tabUpdate: true })
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

  $scope.showTabConsulta = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabConsulta: true })
  }

  $scope.showAdicionarLista = function (paciente) {
    $scope.paciente = paciente
    $scope.fila = {}
    $scope.fila.dataFila = new Date()
    tabs.show($scope, { tabPacienteFila: true })
  }

  $scope.showTabCreate = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabUpdate: true, tabList: true })
  }

  $scope.cancel = function () {
    $scope.paciente = {}
    $scope.limparFiltro()
    tabs.show($scope, { tabCreate: true, tabList: true })
  }

  $scope.cancelConsulta = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabConsulta: true })
  }

  $scope.addConsultaBtn = function (paciente) {
    $scope.paciente = paciente
    tabs.show($scope, { tabFormConsulta: true })
  }

  $scope.delConsulta = function (index) {
    $scope.paciente.consultas.splice(index, 1)
  }

  $scope.addConsulta = function (index) {
    $scope.paciente.consultas.splice(index + 1, 0, {})
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

  //Adicionar paciente na fila de atendimento
  $scope.addFila = function (paciente, fila) {
    const url = `${consts.apiUrl}/fila`
    var medico = $scope.paciente.medicoId
    var paciente = $scope.paciente._id
    var periodo = $scope.fila.dataFila
    const url2 = `${consts.apiUrl}/filaQtd/${medico}/${paciente}/${periodo}`
    $scope.fila.medicoId = medico
    $scope.fila.pacienteId = paciente
    $scope.fila.nome = $scope.paciente.nome
    $scope.fila.sobrenome = $scope.paciente.sobrenome
    $http.get(url2).then(function (resp) {
      $scope.validacao = {}
      $scope.validacao = resp.data
      //Montar verificação de datas 
      var dt4 = new Date($scope.fila.dataFila)
      var d = parseInt(dt4.getUTCDate())
      var m = parseInt(dt4.getUTCMonth() + 1)
      var y = parseInt(dt4.getFullYear())
      var valDt = y + m + d
      var dt5 = new Date()
      var d2 = parseInt(dt5.getUTCDate())
      var m2 = parseInt(dt5.getUTCMonth() + 1)
      var y2 = parseInt(dt5.getFullYear())
      var valDt2 = y2 + m2 + d2
      //Validar se o paciente existe ou se a data é valida
      if (parseInt($scope.validacao.value) > 0) {
        //Se o exister resultado não pode adicionar o paciente na fila de atendimento
        msgs.addError('O paciente já foi adicionado na Fila para o perído informado.')
      } else if (valDt < valDt2) {
        //console.log(valDt,valDt2)
        //Se período for menor que o dia atual não é permitido cadastrar paciente na fila
        msgs.addError('O período não pode ser menor que a data atual.')
      } else {
        $http.post(url, $scope.fila).then(function (response) {
          $scope.fila = {}
          $scope.paciente = {}
          $scope.getPacientes()
          msgs.addSuccess('Paciente adicionado na "Fila de Atendimento" com sucesso!')
          tabs.show($scope, { tabList: true, tabCreate: true })

        }).catch(function (resp) {
          msgs.addError(resp.data.errors)
        })
      }
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

  $scope.getPacientes()
  $scope.permissao()
}