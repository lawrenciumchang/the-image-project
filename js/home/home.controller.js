'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $state, $firebaseAuth, $firebaseStorage) {
    var vm = this;

    vm.images = [];

    var auth = $firebaseAuth();
    var beforePath,
        afterPath,
        storageRef,
        storage;

    activate();

    function activate() {
        var promises = [getImages()];
        return $q.all(promises).then(function() {

        });
    }

    function getImages() {
        firebase.database().ref('/images').once('value').then(function(imageGroups) {
            vm.imageGroups = imageGroups.val();
            for(var i = 0; i < vm.imageGroups.length; i++) {
                var image = {};
                beforePath = vm.imageGroups[i].before;
                afterPath = vm.imageGroups[i].after;
                storageRef = firebase.storage().ref('/images/' + beforePath);
                storage = $firebaseStorage(storageRef);
                storage.$getMetadata().then(function(metadata) {
                    image[0] = metadata;
                });
                storageRef = firebase.storage().ref('/images/' + afterPath);
                storage = $firebaseStorage(storageRef);
                storage.$getMetadata().then(function(metadata) {
                    image[1] = metadata;
                });
                vm.images.push(image);
            }
        });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
