'use strict';
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('../constants/GeoAppActions');
var GeoObjectActionCreators = {

    /**
     * Add one geo object with raw data
     * @param {object} geoObjectRawData The raw data that describes geo object
     */
    addOneObject: function (geoObjectRawData) {
        GeoAppDispatcher.dispatch({
            actionType: GeoAppActionsConstants.GEO_OBJECTS_CREATE,
            rawData: geoObjectRawData
        });
    },

    /**
     * Delete geo object
     * @param {object} geoObjectRawData
     */
    deleteObject: function (geoObjectRawData) {
        GeoAppDispatcher.dispatch({
            actionType: GeoAppActionsConstants.GEO_OBJECTS_DELETE,
            rawData: geoObjectRawData
        });
    }
};

module.exports = GeoObjectActionCreators;
