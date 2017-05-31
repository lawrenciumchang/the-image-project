'use strict';

app
    .controller('MenuController', MenuController);

/* @ngInject */
function MenuController($q, $state, $firebaseAuth) {
    var vm = this;
    vm.toggleForm = toggleForm;
    vm.removeFocus = removeFocus;
    vm.signUp = signUp;
    vm.logIn = logIn;
    vm.logOut = logOut;

    vm.user = {};
    vm.signUpView = true;

    var auth = $firebaseAuth();

    activate();

    function activate() {
        var promises = [];
        return $q.all(promises).then(function() {

        });
    }

    function toggleForm() {
        vm.signUpView = !vm.signUpView;
        document.getElementById('dropdown').focus();
    }

    function removeFocus() {
        document.getElementById('dropdown').blur();
    }

    function signUp(signUpForm) {
        auth.$createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .then(function(user) {
                user.updateProfile({
                    displayName: signUpForm.name
                }).then(function() {

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
        auth.$signInWithEmailAndPassword(logInForm.email, logInForm.password)
            .then(function() {

            })
            .catch(function(error) {
                // TODO: display form errors to user
                console.log(error.code, error.message);
            });
    }

    function logOut() {
        auth.$signOut()
            .then(function() {
                $state.go('home');
            })
            .catch(function(error) {
                console.log(error.code, error.message);
            });
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
