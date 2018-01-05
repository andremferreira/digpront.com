angular.module('digPront').factory('pMaiuscula', [function () {
    function pUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return { pUpper };
}])