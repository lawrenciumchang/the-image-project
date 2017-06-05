'use strict';

app
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $scope, $firebaseAuth) {
    var vm = this;
    vm.toggleEditMode = toggleEditMode;
    vm.updatePost = updatePost;

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

    function toggleEditMode(image) {
        image.toggle = !image.toggle;
    }

    function updatePost(image) {

    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
