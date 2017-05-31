'use strict';

app
    .controller('UserProfileController', UserProfileController);

/* @ngInject */
function UserProfileController($q, $firebaseAuth) {
    var vm = this;

    vm.editMode = false;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {

        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
