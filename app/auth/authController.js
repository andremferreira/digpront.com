(function () {

    angular.module('digPront').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        vm.loginMode = true
        vm.forgotPass = false
        vm.assist = false
        vm.recoveryVerifyMode = false
        vm.changeMode = () => vm.loginMode = !vm.loginMode
        vm.changeModeAssist = () => vm.assist = !vm.assist
        vm.changeModeForgotPass = () => vm.forgotPass = !vm.forgotPass
        vm.changeModeRecovery = () => vm.recoveryVerifyMode = !vm.recoveryVerifyMode
        vm.codRecovery = $location.search().recoveryPass || ''
        console.log(vm.codRecovery)
        if (vm.codRecovery != '') {
            console.log('Verificação do código de recuperação')
            vm.user = {}
            vm.changeModeRecovery()
            console.log('Recuperanção em andamento')
            console.log('Carregamento formulário de troca de senha.')
            console.log(`Recuperanção em andamento: ${vm.recoveryVerifyMode}`)

        }

        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.loginAssist = () => {
            auth.loginAssist(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }

            vm.changeRecoveryPass = () => {
                console.log(vm.user.pass)
                if( vm.user.pass == vm.user.confPass){
                vm.user.recoveryPass =  vm.codRecovery
                vm.user.recoveryDt = new Date()
                vm.user.recoveryStatus = true
                auth.changeRecoveryPass(vm.user, (err, success) => {
                        if(err){
                            msgs.addError(err)
                        } else if (success) {
                            vm.user = {}
                            msgs.addSuccess(success)
                            vm.changeModeRecovery()
                            auth.logout(() => $location.path('/'))
                        }else{
                            vm.user = {}
                            vm.changeModeRecovery()
                            auth.logout(() => $location.path('/'))
                        }
                    })
                } else {
                    msgs.addError('Confirmação e senha não coferem.')
                    vm.user = {}
                }
            }

        vm.recoveryPass = () => {
            auth.recoveryPass(vm.user, (err, success) => {
                if (err) {
                    msgs.addError(err)
                } else if (success) {
                    vm.user = {}
                    msgs.addSuccess(success)
                    vm.forgotPass = false
                    auth.logout(() => $location.path('/'))
                }
                else {
                    auth.logout(() => $location.path('/'))
                }
            })
        }
    }
})()