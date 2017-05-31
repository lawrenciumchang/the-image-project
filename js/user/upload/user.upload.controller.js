'use strict';

app
    .controller('UserUploadController', UserUploadController);

/* @ngInject */
function UserUploadController($q, $scope, $state, $firebaseAuth, Upload) {
    var vm = this;
    vm.submit = submit;

    vm.upload = {
        title: '',
        description: '',
        username: '',
        uid: '',
        before: {
            image: '',
            filename: ''
        },
        after: {
            image: '',
            filename: ''
        }
    };

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

    $scope.$watch('vm.upload.before.image', function () {
        if(vm.upload.before.image) {
            vm.upload.before.filename = generateHash() + '.jpg';
        }
    });

    $scope.$watch('vm.upload.after.image', function () {
        if(vm.upload.after.image) {
            vm.upload.after.filename = generateHash() + '.jpg';
        }
    });

    function generateHash() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    function uploadImage(key, image) {
        Upload.dataUrl(image, true).then(function(dataUrl){
            dataUrl = dataUrl.substring(dataUrl.indexOf(',')+1);
            var filename = key == 'before' ? vm.upload.before.filename : vm.upload.after.filename;
            var metadata = {
                contentType: 'image/jpeg',
            };
            var ref = firebase.storage().ref('/images').child(filename);
            ref.putString(dataUrl, 'base64', metadata);
        });
    }

    function submit() {
        var promises = [uploadImage('before', vm.upload.before.image), uploadImage('after', vm.upload.after.image)];
        return $q.all(promises).then(function() {
            // Populate database

            $state.go('user.images');
        });
    }

}
