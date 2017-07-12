'use strict';

app
    .controller('UserProfileController', UserProfileController);

/* @ngInject */
function UserProfileController($q, $firebaseAuth) {
    var vm = this;
    vm.rollbackView = rollbackView;
    vm.saveDisplayName = saveDisplayName;
    vm.sendPasswordResetEmail = sendPasswordResetEmail;
    vm.deleteAccount = deleteAccount;

    vm.userCopy = {};
    vm.editMode = false;

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

    function sendPasswordResetEmail() {
        var email = firebase.auth().currentUser.email;
        auth.$sendPasswordResetEmail(email).then(function() {
            $('.password-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
        }).catch(function(error) {
            $('.password-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
        });
    }

    function deleteAccount() {
        // TO-DO: Delete account and remove photos from db. Display confirmation toast message.

    };

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
        angular.copy(user, vm.userCopy);
    });

}
