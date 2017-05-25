'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $scope, $firebaseAuth) {
    var vm = this;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getImages() {
        firebase.database().ref('/images').once('value').then(function(images) {
            vm.images = images.val();
            $scope.$apply();
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
