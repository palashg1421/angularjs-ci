myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider)
{
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', {
            url: '/',
            views: {'content':{templateUrl: 'templates/template-login.html'}},
            data: {requireLogin: false}
        })
        .state('logout', {
            url: '/logout',
            views: {content:{templateUrl: 'templates/template-login.html'}},
            data: {requireLogin: false}
        })
        .state('list', {
            url: '/list',
            views: {
                'nav':{templateUrl: 'templates/template-nav.html'},
                'content':{templateUrl: 'templates/user/template-list.html'}
            },
            data: {requireLogin: true}
        })
        .state('add', {
            url: '/add',
            views: {
                'nav':{templateUrl: 'templates/template-nav.html'},
                'content':{templateUrl: 'templates/user/template-add.html'}
            },
            data: {requireLogin: true}
        })
        .state('edit', {
            url: '/edit/:id',
            views: {
                'nav':{templateUrl: 'templates/template-nav.html'},
                'content':{templateUrl: 'templates/user/template-edit.html'}
            },
            data: {requireLogin: true}
        });
}]);
