myApp.controller('authController',['$scope', '$state', 'toaster', 'ipCookie', 'utility',function($scope, $state, toaster, ipCookie, utility)
{
    $scope.email    = "admin@mailinator.com";
    $scope.password = "test123";
    var salt     = "JHJhbmRvbUBzYWx0";

    /* login functionality */
    $scope.login = function(){
        var data = {
            email: $scope.email,
            password: btoa($scope.password) + '.' + salt
        };
        utility.send('auth/login', data, 'post').then(
            function(response){
                if( response.data.status === 1)
                {
                    /*
                     * Cookie time unit must be in:
                     * hours, minutes, seconds or milliseconds
                     */
                    ipCookie('userCookie', response.data.data, { expires: 5, expirationUnit: 'hours', path: '/'});
                    $state.go('list');
                }
                else
                    toaster.pop('error', "", response.data.message);
            },
            function(response){
                console.log(response);
            }
        );
    };

    /* logout functionality */
    if( $state.current.name === 'logout')
    {
        if( ipCookie('userCookie') )
        {
            ipCookie.remove('userCookie', { path: '/' });
            toaster.pop('success', "", 'You have been logout successfully');
            $state.go('/');
        }
    }
}]);
