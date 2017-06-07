'use strict';

app
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $firebaseAuth, $firebaseArray) {
    var vm = this;

    vm.reverseSort = true;
    vm.images = [];

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getImages() {
        var ref = firebase.database().ref('/images');
        vm.images = $firebaseArray(ref);
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
