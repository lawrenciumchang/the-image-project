'use strict';

app
    .controller('UserProfileController', UserProfileController);

/* @ngInject */
function UserProfileController($q, $timeout, $firebaseAuth, $firebaseArray, $firebaseStorage) {
    var vm = this;
    vm.rollbackView = rollbackView;
    vm.saveDisplayName = saveDisplayName;
    vm.sendPasswordResetEmail = sendPasswordResetEmail;
    vm.deleteAccount = deleteAccount;

    vm.userCopy = {};
    vm.editMode = false;
    vm.deleting = false;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {
            $('.section-title').fadeIn('slow');
            setTimeout(function() {
                $('.profile').fadeIn('slow');
            }, 1000);
        });
    }

    function rollbackView() {
        angular.copy(firebase.auth().currentUser, vm.userCopy);
    }

    function saveDisplayName(userCopy) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userCopy.displayName
        }).then(function() {
            $('.name-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
        }).catch(function(error) {
            $('.name-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
        });
    }

    function sendPasswordResetEmail(user) {
        auth.$sendPasswordResetEmail(user.email).then(function() {
            $('.send-password-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
        }).catch(function(error) {
            $('.send-password-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
        });
    }

    function wipeDbForUser(uid) {
        var databaseRef = firebase.database().ref('/images');
        var storageRef = firebase.storage().ref('/images');
        vm.images = $firebaseArray(databaseRef);
        vm.images.$loaded().then(function(){
            angular.forEach(vm.images, function(value, key) {
                if(value.uid == uid) {
                    var beforeImage = value.before;
                    var afterImage = value.after;
                    vm.images.$remove(key).then(function() {
                        var beforeImageRef = storageRef.child(beforeImage);
                        var afterImageRef = storageRef.child(afterImage);
                        var beforeStorage = $firebaseStorage(beforeImageRef);
                        var afterStorage = $firebaseStorage(afterImageRef);
                        beforeStorage.$delete().then(function() {
                            afterStorage.$delete().then(function() {
                            });
                        });
                    });
                }
            });
        });
    }

    function deleteAccount() {
        vm.deleting = true;
        var promises = [wipeDbForUser(vm.user.uid)];
        return $q.all(promises).then(function() {
            $timeout(function() {
                auth.$deleteUser().then(function() {

                }).catch(function(error) {
                    vm.deleting = false;
                    $('.delete-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
                });
            }, 1000);
        });
    };

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
        angular.copy(user, vm.userCopy);
    });

}
