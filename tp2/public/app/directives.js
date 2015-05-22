(function() {
    'use strict';

    function GravatarDirective() {
        return {
            restrict: 'E',
            template: '<img src="http://www.gravatar.com/avatar/{{ hash }}?s={{ size }}" />',
            link: function(scope, element, attributs) {
                scope.hash = md5(attributs.email);
                scope.size = attributs.size || 200;
            }
        }
    }

    function DiscoSortableDirective() {
        return {
            restrict: 'A',
            scope: {
                sorter: '='
            },
            templateUrl: 'views/disco_sortable.html',
            link: function(scope, element, attributs) {
                scope.field = attributs.field;
            }
        }
    }

    function DiscoSortableDirectiveTest() {
        return {
            restrict: 'A',
            scope: {
                sorter: '='
            },
            transclude: true,
            templateUrl: 'views/disco_sortable.html',
            compile: function(element, attributs, transclude) {
                return function(scope, element, attrs) {
                    transclude(scope, function(clone) {
                        scope.field = clone[0].textContent;
                    });
                }
            }
        }
    }

    angular.module('app')
        .directive('discoSortable', DiscoSortableDirective)
        .directive('gravatar', GravatarDirective);

})();
