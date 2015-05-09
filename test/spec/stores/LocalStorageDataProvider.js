'use strict';

describe('LocalStorageDataProvider', function () {
    var LocalStorageDataProvider;

    beforeEach(function () {
        LocalStorageDataProvider = require('stores/LocalStorageDataProvider');
    });
    afterEach(function () {
        localStorage.clear();
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

    it('should create new collection with given key', function () {
        var newCollectionKey = 'category';
        LocalStorageDataProvider.createCollection(newCollectionKey);
        expect(LocalStorageDataProvider.read(newCollectionKey)).toEqual({});
    });

    it('should add new item to the specified collection', function () {
        var newCollectionKey = 'category';
        var item = {categoryName:'newCategory'};
        LocalStorageDataProvider.createCollection(newCollectionKey);
        LocalStorageDataProvider.addCollectionItem(newCollectionKey, 'new category', item);
        expect(LocalStorageDataProvider.read(newCollectionKey)).toEqual({'new category':item});
    });

    it('should create collection if given collection key is undefined', function () {
        var newCollectionKey = 'category';
        var item = {categoryName:'newCategory'};
        LocalStorageDataProvider.addCollectionItem(newCollectionKey, 'new category', item);
        expect(LocalStorageDataProvider.read(newCollectionKey)).toEqual({'new category':item});
    });

});
