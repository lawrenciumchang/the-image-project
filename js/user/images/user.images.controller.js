'use strict';

app
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $scope, $firebaseAuth) {
    var vm = this;

    vm.reverseSort = true;
    vm.userImages = [];

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getUserImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getUserImages() {
        if(vm.user) {
            firebase.database().ref('/images').once('value').then(function(images) {
                vm.images = images.val();
                angular.forEach(vm.images, function(image) {
                    if(image.uid == vm.user.uid) {
                        vm.userImages.push(image);
                    }
                });
                $scope.$apply();
            });
        }
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
