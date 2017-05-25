'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $state) {
    var vm = this;

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {

        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        vm.user = user;
        // For testing -- to remove later.
        if (vm.user) {
            console.log('From Home: User ' + vm.user.email + ' is signed in.');
        } 
        else {
            console.log('From Home: User is signed out.');
        }
    });

}
