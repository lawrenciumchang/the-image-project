'use strict';

app
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $scope, $firebaseAuth, $firebaseArray) {
    var vm = this;
    vm.toggleEditMode = toggleEditMode;
    vm.updatePost = updatePost;
    vm.toggleDeleteMode = toggleDeleteMode;
    vm.deletePost = deletePost;

    vm.reverseSort = true;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getUserImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getUserImages() {
        var imagesRef = firebase.database().ref('/images');
        vm.images = $firebaseArray(imagesRef);
    }

    function toggleEditMode(image) {
        image.editMode = !image.editMode;
    }

    function updatePost(image) {

    }

    function toggleDeleteMode(image) {
        image.deleteMode = !image.deleteMode;
    }

    function deletePost(image) {

    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
