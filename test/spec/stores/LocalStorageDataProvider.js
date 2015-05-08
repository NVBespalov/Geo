'use strict';

describe('LocalStorageDataProvider', function () {
    var LocalStorageDataProvider;

    beforeEach(function () {
        LocalStorageDataProvider = require('stores/LocalStorageDataProvider');
    });

    it('should be defined', function () {
        expect(LocalStorageDataProvider).toBeDefined();
    });
    it('should return given value for given key', function () {
        var value = {testObject:'data'};
        var testingPropertyName = 'test';
        LocalStorageDataProvider.write(testingPropertyName, value);
        expect(LocalStorageDataProvider.read(testingPropertyName)).toEqual(value);
    });
});
