angular.module('digPront').constant('consts', {
  appName: 'Excelência em Gestão de Pacientes.',
  version: '1.0',
  owner: 'Digital Prontuário',
  year: '2017',
  site: 'https://digpront.com',
  // apiUrl: 'https://digpront.cnt.br/api',
  // oapiUrl: 'https://digpront.cnt.br/oapi',
  apiUrl: 'http://localhost:3000/api',
  oapiUrl: 'http://localhost:3000/oapi',  
  userKey: 'digProntApp'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
  $rootScope.consts = consts
}])
