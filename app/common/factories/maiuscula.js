angular.module('digPront').factory('maiuscula', [function () {
    function maiuscula(string) {
        return string.toUpperCase()
    }
    return { maiuscula };
}])