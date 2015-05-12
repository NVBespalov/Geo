'use strict';
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('../constants/GeoAppActions');
var GeoObjectActionCreators = {

    /**
     * Add one geo object with raw data
     * @TODO refactor This should be refactored in order to reduce responsibilities
     * @param {object} geoObjectRawData The raw data that describes geo object
     * @param oldObject
     */
    addOneOrUpdateObject: function (geoObjectRawData, oldObject) {
        var _ = require('underscore');
        if(_.keys(oldObject).length){
            GeoAppDispatcher.dispatch({
                actionType: GeoAppActionsConstants.GEO_OBJECTS_UPDATE,
                rawData: geoObjectRawData,
                oldRawData: oldObject
            });
        } else {
            GeoAppDispatcher.dispatch({
                actionType: GeoAppActionsConstants.GEO_OBJECTS_CREATE,
                rawData: geoObjectRawData
            });
        }
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
