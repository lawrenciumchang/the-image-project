angular.directive('twentytwenty', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var img = element.find('img');
            img.bind('load', function () {
                element.twentytwenty(scope.$eval(attrs.twentytwenty));
            });
        }
    };
}); 
