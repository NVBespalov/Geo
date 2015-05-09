'use strict';

var AbstractStore = require('stores/AbstractStore');
var assign = require('object-assign');
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('constants/GeoAppActions');
var CHANGE_EVENT = 'change';
var LocalStoreDataProvider = require('stores/LocalStorageDataProvider');

var GeoObjectsStore = assign({}, AbstractStore, {});

GeoObjectsStore.dispatchToken = GeoAppDispatcher.register(function (action) {

    switch (action.type) {
        case GeoAppActionsConstants.GEO_OBJECTS_CREATE:
            LocalStoreDataProvider.addCollectionItem(GeoAppActionsConstants.GEO_OBJECTS_COLLECTION, action.rawData.name, action.rawData);
            GeoObjectsStore.emitChange();
            break;
        default:
    }

});

module.exports = GeoObjectsStore;
