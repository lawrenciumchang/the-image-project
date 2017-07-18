'use strict';

app
    .controller('MenuController', MenuController);

/* @ngInject */
function MenuController($q, $state, $firebaseAuth) {
    var vm = this;
    vm.toggleForm = toggleForm;
    vm.togglePasswordForm = togglePasswordForm;
    vm.signUp = signUp;
    vm.logIn = logIn;
    vm.logOut = logOut;
    vm.sendPasswordResetEmail = sendPasswordResetEmail;

    vm.user = {};
    vm.signUpView = true;
    vm.passwordResetView = false;
    vm.invalidSignupEmail = false;
    vm.weakPassword = false;
    vm.invalidLoginEmail = false;
    vm.invalidCombination = false;

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

    function togglePasswordForm() {
        vm.passwordResetView = !vm.passwordResetView;
        document.getElementById('dropdown').focus();
    }

    function signUp(signUpForm) {
        $('.btn-signup').addClass('loading');
        vm.invalidSignupEmail = false;
        vm.weakPassword = false;
        $('#signup-email').removeClass('is-error');
        $('#signup-password').removeClass('is-error');
        auth.$createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .then(function(user) {
                user.updateProfile({
                    displayName: signUpForm.name
                }).then(function() {
                    $('.signup-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
                    $state.reload();
                }).catch(function(error) {
                    $('.general-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
                });
            })
            .catch(function(error) {
                switch(error.code) {
                    case 'auth/invalid-email': 
                        $('#signup-email').addClass('is-error');
                        vm.invalidSignupEmail = true;
                        break;
                    case 'auth/weak-password':  
                        $('#signup-password').addClass('is-error');
                        vm.weakPassword = true;
                        break;
                    default: break;
                }
            })
            .finally(function() {
                $('.btn-signup').removeClass('loading');
            }); 
    }

    function logIn(logInForm) {
        $('.btn-login').addClass('loading');
        vm.invalidLoginEmail = false;
        vm.invalidCombination = false;
        $('#login-email').removeClass('is-error');
        $('#login-password').removeClass('is-error');
        auth.$signInWithEmailAndPassword(logInForm.email, logInForm.password)
            .then(function() {
                $('.login-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
            })
            .catch(function(error) {
                switch(error.code) {
                    case 'auth/invalid-email': 
                        $('#login-email').addClass('is-error');
                        vm.invalidLoginEmail = true;
                        break;
                    case 'auth/user-not-found':  
                        $('#login-email').addClass('is-error');
                        $('#login-password').addClass('is-error');
                        vm.invalidCombination = true;
                        break;
                    case 'auth/wrong-password':
                        $('#login-email').addClass('is-error');
                        $('#login-password').addClass('is-error');
                        vm.invalidCombination = true;
                        break;
                    default: break;
                }
            })
            .finally(function() {
                $('.btn-login').removeClass('loading');
            }); 
    }

    function logOut() {
        auth.$signOut()
            .then(function() {
                $('.logout-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
                $state.go('home');
            })
            .catch(function(error) {
                $('.general-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
            });
    }

    function sendPasswordResetEmail(passwordResetForm) {
        if(passwordResetForm.email) {
            auth.$sendPasswordResetEmail(passwordResetForm.email).then(function() {
                vm.passwordResetView = false;
                $('.password-success').fadeIn().removeClass('hide').delay(2000).fadeOut();
            }).catch(function(error) {
                $('.general-error').fadeIn().removeClass('hide').delay(2000).fadeOut();
            });
        }
    }

    auth.$onAuthStateChanged(function(user) {
        vm.user = user;
    });

}
