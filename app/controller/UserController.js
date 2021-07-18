myApp.controller('userController', ['$scope', '$state', '$stateParams', 'toaster', 'utility', function($scope, $state, $stateParams, toaster, utility)
{
    $scope.user_id      = "";
    $scope.user_name    = "";
    $scope.user_phone   = "";
    $scope.user_email   = "";
    $scope.user_pass    = "";
        
    /** list user */
    $scope.listUser = function()
    {
        var data = {
            user_name: $scope.user_name,
            user_phone: $scope.user_phone,
            user_email: $scope.user_email
        };
        utility.send('user/list', data, 'post').then(
            function(response)
            {
                if( response.data.status === 1)
                    $scope.user_listing = response.data.data;
            },
            function(response){
                console.log(response);
            }
        );
    };
    if($state.current.name === 'list')
        $scope.listUser();

    /** add user */
    $scope.addUser = function()
    {
        var data = {
            user_name: $scope.user_name,
            user_phone: $scope.user_phone,
            user_email: $scope.user_email,
            user_pass: $scope.user_pass
        };
        utility.send('user/add', data, 'post').then(
            function(response){
                if( response.data.status === 0 )
                    toaster.pop('error', '', response.data.message);
                if( response.data.status === 1 )
                {
                    toaster.pop('success', '', response.data.message);
                    $state.go('list');
                }
            },
            function(response){
                console.log(response);
            }
        );
    };
    
    /* get user by id */
    $scope.getUser = function(user_id)
    {
        var data = {user_id: $stateParams.id};
        utility.send('user/get', data, 'post').then(
            function(response)
            {
                if(response.data.status === 0)
                {
                    $state.go('list');
                    toaster.pop('error', '', response.data.message);
                }
                if(response.data.status === 1)
                {
                    $scope.user_name    = response.data.data.user_name;
                    $scope.user_phone   = response.data.data.user_phone;
                    $scope.user_email   = response.data.data.user_email;
                }
            },
            function(response){
                console.log(response);
            }
        );
    }
    if($stateParams.id)
        $scope.getUser($stateParams.id);
    
    /* edit user */
    $scope.updateUser = function()
    {
        var data = {
            user_name: $scope.user_name,
            user_phone: $scope.user_phone,
            user_email: $scope.user_email,
            user_id: $stateParams.id
        };
        utility.send('user/update', data, 'post').then(
            function(response)
            {
                if(response.data.status === 1)
                {
                    $state.go('list');
                    toaster.pop('success', '', response.data.message);
                }
                if(response.data.status === 0)
                    toaster.pop('error', '', response.data.message);
            },
            function(response){
            }
        );
    };

    /* delete user */
    $scope.deleteUser = function(uid)
    {
        bootbox.confirm('Are you sure?', function(result){
            if(result)
            {
                var data = {user_id: uid};
                utility.send('user/delete', data, 'post').then(
                    function(response)
                    {
                        if(response.data.status === 0)
                            toaster.pop('error', '', response.data.message);
                        if(response.data.status === 1)
                        {
                            toaster.pop('success', '', response.data.message);
                            $state.reload();
                        }
                    },
                    function(response){
                        console.log(response);
                    }
                );
            }
        });
    };
    
    $scope.resetFilters = function()
    {
        $scope.user_name = '';
        $scope.user_phone = '';
        $scope.user_email = '';
        $scope.listUser();
    };

    /* sort user by name */
    $scope.sortUser = function(key){
        $scope.sort_key = key;
        $scope.reverse = !$scope.reverse;
    };
        
}]);
