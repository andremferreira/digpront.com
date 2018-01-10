(function () {

    angular.module('digPront').controller('AuthCtrl', [
        '$document',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController( $document, msgs, auth) {
        const vm = this

        vm.loginMode = true
        vm.assist = false

        vm.changeMode = () => vm.loginMode = !vm.loginMode
        vm.changeModeAssist = () => vm.assist = !vm.assist

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
    }
})()