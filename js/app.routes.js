'use strict';

angular
    .config(Routes)
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
        .state('user.settings', {
            url: '/settings',
            templateUrl: 'js/user/settings/user.settings.template.html',
            controller: 'UserSettingsController',
            controllerAs: 'vm'
        });
};
