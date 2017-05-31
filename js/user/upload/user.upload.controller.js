'use strict';

app
    .controller('UserUploadController', UserUploadController);

/* @ngInject */
function UserUploadController($q, $scope, $state, $firebaseAuth, Upload, $timeout) {
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
        return (S4()+S4()+'-'+S4()+'-'+S4()+'-'+S4()+'-'+S4()+S4()+S4());
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
        $('.btn-submit').addClass('loading');
        var promises = [uploadImage('before', vm.upload.before.image), uploadImage('after', vm.upload.after.image)];
        return $q.all(promises).then(function() {
            firebase.database().ref('images').push({
                after: vm.upload.after.filename,
                before: vm.upload.before.filename,
                description: vm.upload.description,
                title: vm.upload.title,
                username: vm.user.displayName,
                uid: vm.user.uid
            });
            $timeout(function() {
                $('.btn-submit').removeClass('loading');
                $state.go('user.images');
            }, 2000);
        });
    }

}
