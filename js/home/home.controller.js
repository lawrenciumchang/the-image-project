'use strict';

angular
    .controller('HomeController', HomeController);

/* @ngInject */
function HomeController($q, $state) {
    var vm = this;
    vm.toggleForm = toggleForm;
    vm.signUp = signUp;
    vm.logIn = logIn;
    vm.logOut = logOut;

    vm.user = {};
    vm.signUpView = true;

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {

        });
    }

    function toggleForm() {
        vm.signUpView = !vm.signUpView;
    }

    function signUp(signUpForm) {
        firebase.auth().createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .then(function(user) {
                user.updateProfile({
                    displayName: signUpForm.name
                }).then(function() {
                    $state.reload();
                }).catch(function(error) {
                    console.log(error.code, error.message);
                });
            })
            .catch(function(error) {
                // TODO: display form errors to user
                console.log(error.code, error.message);
            });
    }

    function logIn(logInForm) {
        firebase.auth().signInWithEmailAndPassword(logInForm.email, logInForm.password)
            .then(function() {
                $state.reload();
            })
            .catch(function(error) {
                // TODO: display form errors to user
                console.log(error.code, error.message);
            });
    }

    function logOut() {
        firebase.auth().signOut()
            .then(function() {
                $state.reload();
            })
            .catch(function(error) {
                console.log(error.code, error.message);
            });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        vm.user = user;
        // For testing -- to remove later.
        if (vm.user) {
            console.log('User ' + vm.user.email + ' is signed in.');
        } 
        else {
            console.log('User is signed out.');
        }
    });

}
