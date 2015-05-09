'use strict';

describe('GeoObjectsStore', function () {
    var store;

    beforeEach(function () {
        store = require('stores/GeoObjectsStore.js');
    });

    it('should be defined', function () {
        expect(store).toBeDefined();
    });
});
