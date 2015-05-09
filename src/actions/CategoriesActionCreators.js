'use strict';

var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var GeoAppActionsConstants = require('../constants/GeoAppActions');
var CategoriesActionCreators = {
    /**
     * Add one category with raw data
     * @param {object} categoryRawData The raw data that describes category
     */
    addOneCategory: function (categoryRawData) {
        GeoAppDispatcher.dispatch({
            actionType: GeoAppActionsConstants.CATEGORY_CREATE,
            rawData: categoryRawData
        });
    }
};

module.exports = CategoriesActionCreators;
