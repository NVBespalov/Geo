'use strict';

describe('AbstractStore', function () {
    var store;

    beforeEach(function () {
        store = require('stores/AbstractStore.js');
    });

    it('should be defined', function () {
        expect(store).toBeDefined();
    });
});
