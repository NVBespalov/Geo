'use strict';

var AbstractStore = require('stores/AbstractStore');
var assign = require('object-assign');
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('../constants/GeoAppActions');
var LocalStoreDataProvider = require('stores/LocalStorageDataProvider');

var CategoriesStore = assign({}, AbstractStore, {
    /**
     * Get all categories from store
     * @returns {*}
     */
    getAllCategories: function () {
        var _ = require('underscore');
        return _.union(LocalStoreDataProvider.read(GeoAppActionsConstants.CATEGORIES_COLLECTION),['Без категории']);
    }

});

GeoAppDispatcher.register(function (action) {
    switch (action.actionType) {
        case GeoAppActionsConstants.CATEGORY_CREATE:
            LocalStoreDataProvider.addCollectionItem(GeoAppActionsConstants.CATEGORIES_COLLECTION, action.rawData.name);
            CategoriesStore.emitChange();
            break;
        default:
    }

});

module.exports = CategoriesStore;
