(function() {
'use strict';

function TruncateFilter() {
    return function(input, length, finalChar) {
        length = length || 25;
        finalChar = finalChar || '...';
        return input.substring(0,length) + ' ' + finalChar;
    }
}

function AverageFilter()
{
    return function(input) {
        var total = 0;

        _.forEach(input, function(n, key) {
            total += n;
        });

        return total/input.length;
    }
}

function PluckFilter()
{
    return function(input, path) {
        return _.pluck(input, path);
    }
}

angular.module('app')
    .filter('truncate', TruncateFilter)
    .filter('average', AverageFilter)
    .filter('pluck', PluckFilter);

})();