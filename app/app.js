/* creating main app */
var myApp = angular.module('myApp', ['ui.router', 'toaster', 'ipCookie', 'angularUtils.directives.dirPagination']);

/* default settings on app run */
myApp.run(['$transitions', 'toaster', 'ipCookie', function($transitions, toaster, ipCookie)
{
    
    /* ui router transition change event */
    $transitions.onStart({}, function(trans)
    {
        var loginRerquired = trans.to().data.requireLogin;
        var jwtToken = ipCookie('userCookie');

        if( loginRerquired && !jwtToken)
        {
            toaster.pop('error', 'Access Denine!', 'You session has been expired.');
            return trans.router.stateService.target('/');
        }
    });
}]);
