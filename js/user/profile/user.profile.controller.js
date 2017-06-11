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
            $('.section-title').fadeIn('slow');
            setTimeout(function() {
                $('.profile').fadeIn('slow');
            }, 1000);
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
