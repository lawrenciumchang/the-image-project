'use strict';

app
    .controller('UserProfileController', UserProfileController);

/* @ngInject */
function UserProfileController($q, $firebaseAuth) {
    var vm = this;
    vm.saveDisplayName = saveDisplayName;
    vm.sendResetPasswordEmail = sendResetPasswordEmail;
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

    function saveDisplayName(userCopy) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userCopy.displayName
        }).then(function() {
            // TO-DO: Display toast message here

        }).catch(function(error) {
            // TO-DO: Display toast message here

        });
    }

    function sendResetPasswordEmail() {
        // TO-DO: Send email and display toast message

    }

    function deleteAccount() {
        // TO-DO: Delete account and remove photos from db. Display confirmation toast message.

    };

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
        angular.copy(user, vm.userCopy);
    });

}
