'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q) {
    var vm = this;

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {

        });
    }

}
