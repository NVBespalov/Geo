/**
 * Created by nickbespalov on 08.05.15.
 */
'use strict';



var LocalStorageDataProvider = {

    /**
     * Write data into local storage.
     * If browser does not have it nothing happens.
     * @param {string} key The name of the local storage property
     * @param {*} value
     */
    write: function (key, value) {
        if (typeof localStorage === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },

    /**
     * Read data from the local storage.
     * If there is no local storage returns undefined.
     * @param {string} key The name of the local storage property
     * @returns {undefined/*} The value of the given property
     */
    read: function (key) {
        if (typeof localStorage === 'object') {
            return JSON.parse(localStorage.getItem(key));
        }
    },

    /**
     * Create new collection.
     * @param  {string} collectionKey The name of the new collection
     */
    createCollection: function (collectionKey) {
        this.write(collectionKey, []);
    },

    /**
     * Add an item to the existing collection
     * @param {string} collectionKey The name of collection to add data
     * @param {object} collectionItemRawData The item raw data
     */
    addCollectionItem: function (collectionKey, collectionItemRawData) {
        var collection = this.read(collectionKey);
        if (collection === null) {
            this.createCollection(collectionKey);
            collection = this.read(collectionKey);
        }
        collection.push(collectionItemRawData);
        this.write(collectionKey, collection);
    },

    /**
     * Delete item from the existing collection
     * @param {string} collectionKey The name of collection to add data
     * @param {object} collectionItemRawData The item raw data
     */
    deleteCollectionItem: function (collectionKey, collectionItemRawData) {
        var collection = this.read(collectionKey);
        var _ = require('underscore');
        if (collection) {
            collection = _.without(collection,_.findWhere(collection,collectionItemRawData));
            this.write(collectionKey, collection);
        }

    },

    /**
     * Update item from the existing collection
     * @param {string} collectionKey The name of collection to add data
     * @param {object} oldObjectRawData The old object to update
     * @param {object} collectionItemRawData The item raw data
     */
    updateCollectionItem: function (collectionKey, oldObjectRawData, collectionItemRawData) {
        var collection = this.read(collectionKey);
        var _ = require('underscore');
        if (collection) {
            collection = _.without(collection,_.findWhere(collection,oldObjectRawData));
            this.write(collectionKey, collection);
            this.addCollectionItem(collectionKey, _.extend(oldObjectRawData,collectionItemRawData));
        }

    }

};

module.exports = LocalStorageDataProvider;
