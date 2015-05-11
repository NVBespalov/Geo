'use strict';

var AbstractStore = require('stores/AbstractStore');
var assign = require('object-assign');
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('constants/GeoAppActions');
var LocalStoreDataProvider = require('stores/LocalStorageDataProvider');

var GeoObjectsStore = assign({}, AbstractStore, {
    /**
     * Get all objects from store
     * @returns {*}
     */
    getAllGeoObjects: function () {
        return LocalStoreDataProvider.read(GeoAppActionsConstants.GEO_OBJECTS_COLLECTION);
    }
});

GeoObjectsStore.dispatchToken = GeoAppDispatcher.register(function (action) {
    switch (action.actionType) {
        case GeoAppActionsConstants.GEO_OBJECTS_CREATE:
            LocalStoreDataProvider.addCollectionItem(GeoAppActionsConstants.GEO_OBJECTS_COLLECTION, action.rawData);
            GeoObjectsStore.emitChange();
            break;
        case GeoAppActionsConstants.GEO_OBJECTS_DELETE:
            LocalStoreDataProvider.deleteCollectionItem(GeoAppActionsConstants.GEO_OBJECTS_COLLECTION, action.rawData);
            GeoObjectsStore.emitChange();
            break;
        case GeoAppActionsConstants.GEO_OBJECTS_UPDATE:
            LocalStoreDataProvider.updateCollectionItem(GeoAppActionsConstants.GEO_OBJECTS_COLLECTION, action.oldRawData, action.rawData);
            GeoObjectsStore.emitChange();
            break;
        default:
    }

});

module.exports = GeoObjectsStore;
