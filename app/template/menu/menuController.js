angular.module('digPront').controller('MenuCtrl', [
  '$location',
  'msgs',
  'auth',
  MenuController
])

function MenuController($location, msgs, auth) {
  const vm = this
  vm.mini = true
  // vm.usr2 = function() {
  //   if (auth.getUser().perfil == 2) {
  //     return true 
  //   } else {
  //     return false
  //   }
  // }

  vm.menuMinify = () => vm.mini = !vm.mini
  vm.imgLog = function () {
    if (auth.getUser().perfil == 2) {
      vm.imgLogin = 'imgDoctor2.png'
      vm.usr1 = false
      vm.usr2 = true
      vm.usr3 = false
      vm.vencido = auth.getUser().vencido
    } else if (auth.getUser().perfil == 3) {
      vm.imgLogin = 'secretary2.png'
      vm.usr1 = false
      vm.usr2 = false
      vm.usr3 = true
      vm.vencido = auth.getUser().vencido
    } else {
      vm.imgLogin = 'adm.png'
      vm.usr1 = true
      vm.usr2 = false
      vm.usr3 = false
      vm.vencido = auth.getUser().vencido
    }
  }
  vm.toggleMenu = function () {
    document.body.className = 'skin-black fixed sidebar-mini'
  }

 vm.imgLog()

}