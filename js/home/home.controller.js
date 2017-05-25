'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $state, $firebaseAuth, $firebaseStorage) {
    var vm = this;

    vm.images = [];

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [getImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getImages() {
        // Will need to loop through db here
        
        var fileName = 'macos-sierra.jpg';
        var storageRef = firebase.storage().ref('/images/' + fileName);
        var storage = $firebaseStorage(storageRef);

        storage.$getMetadata().then(function(metadata) {
            vm.images.push(metadata);
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
