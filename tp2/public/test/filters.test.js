describe('filter', function() {

    beforeEach(module('app'));

    describe('truncate', function() {

        it('should truncate text',
            inject(function(truncateFilter) {
                expect(truncateFilter('floran', 4, '\\o/')).toEqual('flor \\o/');
            }));
    });
});