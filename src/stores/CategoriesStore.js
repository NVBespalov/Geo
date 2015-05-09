'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('../constants/GeoAppActions');
var CHANGE_EVENT = 'change';
var LocalStoreDataProvider = require('stores/LocalStorageDataProvider');

var CategoriesStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAllCategories: function () {
        return LocalStoreDataProvider.read(GeoAppActionsConstants.CATEGORIES_COLLECTION);
    }

});

GeoAppDispatcher.register(function (action) {
    switch (action.actionType) {
        case GeoAppActionsConstants.CATEGORY_CREATE:
            LocalStoreDataProvider.addCollectionItem(GeoAppActionsConstants.CATEGORIES_COLLECTION, action.rawData.name, action.rawData);
            CategoriesStore.emitChange();
            break;
        default:
    }

});

module.exports = CategoriesStore;
