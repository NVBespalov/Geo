'use strict';

var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');
var CategoriesActionsConstants = require('../constants/CategoriesActions');
var CategoriesActionCreators = {
    /**
     * Add one category with raw data
     * @param {object} categoryRawData The raw data that describes category
     */
    addOneCategory: function (categoryRawData) {
        GeoAppDispatcher.dispatch({
            actionType: CategoriesActionsConstants.CATEGORY_CREATE,
            rawData: categoryRawData
        });
    }
};

module.exports = CategoriesActionCreators;
