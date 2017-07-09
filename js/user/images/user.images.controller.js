'use strict';

app
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $scope, $firebaseAuth, $firebaseArray, $firebaseStorage, UserUploadService) {
    var vm = this;
    vm.toggleEditMode = toggleEditMode;
    vm.updatePost = updatePost;
    vm.toggleDeleteMode = toggleDeleteMode;
    vm.deletePost = deletePost;

    vm.reverseSort = true;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getUserImages(), checkForNewUpload()];
        return $q.all(promises).then(function() {
            $('.section-title').fadeIn('slow');
            setTimeout(function() {
                if($('.card').length == 0) {
                    vm.noUserImages = true;
                    $scope.$apply();
                    $('.empty').fadeIn('slow');
                }
                $('.card').fadeIn('slow');
            }, 1000);
        });
    }

    function getUserImages() {
        var imagesRef = firebase.database().ref('/images');
        vm.images = $firebaseArray(imagesRef);
    }

    function checkForNewUpload() {
        var uploadSuccess = UserUploadService.getSuccessStatus();
        if(uploadSuccess) {
            $('.upload-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
            UserUploadService.setSuccessStatus(false);
        }
    }

    function toggleEditMode(image) {
        image.editMode = !image.editMode;
    }

    function updatePost(image) {
        var index = vm.images.$indexFor(image.$id);
        vm.images.$save(index).then(function() {
            $('.update-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
            toggleEditMode(image);
        })
        .catch(function(error) {
            $('.update-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
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
            $('.delete-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
            var ref = firebase.storage().ref('/images');
            var beforeImageRef = ref.child(beforeImage);
            var afterImageRef = ref.child(afterImage);
            var beforeStorage = $firebaseStorage(beforeImageRef);
            var afterStorage = $firebaseStorage(afterImageRef);
            beforeStorage.$delete().then(function() {
                afterStorage.$delete().then(function() {

                });
            });
        })
        .catch(function(error) {
            $('.delete-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
