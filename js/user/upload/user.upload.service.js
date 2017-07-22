'use strict';

app
    .service('UserUploadService', UserUploadService);

/* @ngInject */
function UserUploadService() {
    var vm = this;
    vm.getSuccessStatus = getSuccessStatus;
    vm.setSuccessStatus = setSuccessStatus;

    vm.uploadSuccess = false;

    function getSuccessStatus() {
        return vm.uploadSuccess;
    }

    function setSuccessStatus(status) {
        vm.uploadSuccess = status;
    }
}
