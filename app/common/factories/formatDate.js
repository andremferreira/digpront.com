angular.module('digPront').factory('formatDate', [function () {
    function toFormatDate(string) {       
        let dt = new Date(string)
        let d = dt.getDate()
        let m = dt.getMonth() + 1
        let y = dt.getFullYear()
        let dtFormat = ''
        dtFormat += (d <= 9 ? '0' + d : d) + '/' + + (m<=9 ? '0' + m : m) + '/' + y
        return dtFormat;
    }
    return { toFormatDate };
}])