'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $state, $firebaseAuth) {
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
