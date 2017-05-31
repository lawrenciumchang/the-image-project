'use strict';

app
    .config(Routes)
    .run(function($rootScope, $state, $firebaseAuth) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            var auth = $firebaseAuth();
            auth.$onAuthStateChanged(function(user) {
                if(!user) {
                    e.preventDefault();
                    $state.go('home');
                }
            });
        });
    })
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });
    }]);

function Routes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'js/home/home.template.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .state('user', {
            abstract: true,
            url: '/user',
            template: '<ui-view/>'
        })
        .state('user.images', {
            url: '/images',
            templateUrl: 'js/user/images/user.images.template.html',
            controller: 'UserImagesController',
            controllerAs: 'vm'
        })
        .state('user.upload', {
            url: '/upload',
            templateUrl: 'js/user/upload/user.upload.template.html',
            controller: 'UserUploadController',
            controllerAs: 'vm'
        })
        .state('user.profile', {
            url: '/profile',
            templateUrl: 'js/user/profile/user.profile.template.html',
            controller: 'UserProfileController',
            controllerAs: 'vm'
        });
};
