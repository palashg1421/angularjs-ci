myApp.service('utility', ['$http', 'ipCookie', function($http, ipCookie)
{
    /* service to send http request with JWT token included */
    this.send = function(endpoint, data, method)
    {
        var url = 'http://localhost/angular/api/'+endpoint;
        var auth = ipCookie('userCookie');
        return $http({
            url: url,
            data: data,
            method: method,
            headers: {Auth: auth}
        });
    };
        
}]);
