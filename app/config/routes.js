angular.module('digPront').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('welcome', {
      url: "/welcome",
      templateUrl: "welcome/welcome.html"
    })
    .state('billingCycle', {
      url: "/billingCycles?page",
      templateUrl: "billingCycle/tabs.html"
    })
    .state('dashboard', {
      url: "/dashboard?page",
      templateUrl: "dashboard/tabs.html"
    })
    .state('pacientes', {
      url: "/pacientes?page",
      templateUrl: "pacientes/tabs.html"
    })
    .state('contato', {
      url: "/contato",
      templateUrl: "contato/contato.html"
    })
    .state('fila', {
      url: "/fila",
      templateUrl: "fila/fila.html"
    })
    .state('meuPerfil', {
      url: "/meuPerfil",
      templateUrl: "meuPerfil/tabs.html"
    })
    .state('renovacao', {
      url: "/renovacao",
      templateUrl: "renovacao/renovacao.html"
    })
    .state('recuperacao',{
      url: "/recuperacao",
      templateUrl: "recuperacao/form.html"
    })

    // $urlRouterProvider.otherwise('/welcome')

    $httpProvider.interceptors.push('handleResponseError')
  }])
  .run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
        validateUser()
        $rootScope.$on('$locationChangeStart', () => validateUser())
      
      function validateUser() {
        const user = auth.getUser()
        const authPage = '/auth.html'
        const isAuthPage = $window.location.href.includes(authPage)
        if (!user && !isAuthPage) {
          $window.location.href = authPage
        } else if (user && !user.isValid) {
          auth.validateToken(user.token, (err, valid) => {
            if (!valid) {
              $window.location.href = authPage
            } else {
              user.isValid = true
              $http.defaults.headers.common.Authorization = user.token
              isAuthPage ? $window.location.href = '/' : $location.path()
            }
          })
        }
      }
    }
  ])
