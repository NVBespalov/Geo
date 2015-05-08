'use strict';

var GeoAppDispatcher = require('dispatcher/GeoAppDispatcher');

var CategoriesActionCreators = {
    /**
     * Add one category with raw data
     * @param {object} categoryRawData The raw data that describes category
     */
    addOneCategory: function (categoryRawData) {
        GeoAppDispatcher.handleViewAction({
            actionType: 'newCategory',
            rawData: categoryRawData
        });
    }
};

module.exports = CategoriesActionCreators;
