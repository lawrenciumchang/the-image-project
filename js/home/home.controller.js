'use strict';

app
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $scope, $firebaseAuth) {
    var vm = this;

    vm.reverseSort = true;
    vm.images = [];

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getImages() {
        firebase.database().ref('/images').once('value').then(function(images) {
            angular.forEach(images.val(), function(image){
                vm.images.push(image);
            });
            $scope.$apply();
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
