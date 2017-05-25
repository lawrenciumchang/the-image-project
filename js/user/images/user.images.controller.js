'use strict';

angular
    .controller('UserImagesController', UserImagesController);

/* @ngInject */
function UserImagesController($q, $firebaseAuth) {
    var vm = this;

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
