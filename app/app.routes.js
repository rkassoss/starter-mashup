define('routes',function(){
    function routeConfig($locationProvider, $stateProvider, $urlRouterProvider){
        $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>',
            title: 'Page 1'
        });
        $urlRouterProvider.otherwise('/');
    }
    routeConfig.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    return routeConfig;
});