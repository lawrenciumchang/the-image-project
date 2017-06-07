'use strict';

app
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $scope, $firebaseAuth, $firebaseArray, $firebaseStorage) {
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
        var index = vm.images.$indexFor(image.$id);
        vm.images.$save(index).then(function() {
            toggleEditMode(image);
        });
    }

    function toggleDeleteMode(image) {
        image.deleteMode = !image.deleteMode;
    }

    function deletePost(image) {
        var index = vm.images.$indexFor(image.$id);
        var beforeImage = image.before;
        var afterImage = image.after;
        vm.images.$remove(index).then(function() {
            var ref = firebase.storage().ref('/images');
            var beforeImageRef = ref.child(beforeImage);
            var afterImageRef = ref.child(afterImage);
            var beforeStorage = $firebaseStorage(beforeImageRef);
            var afterStorage = $firebaseStorage(afterImageRef);
            beforeStorage.$delete().then(function() {
                afterStorage.$delete().then(function() {

                });
            });
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
