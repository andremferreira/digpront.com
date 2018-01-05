angular.module('digPront').factory('filtro', [function () {
    function filtrarBoolean(boolean) {
        if(boolean){
            return 'SIM'
        }else{
            return 'NÃO'
        }
    }
    return { filtrarBoolean };
}])