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
     * Create a category item.
     * @param  {string} collectionKey The name of the new collection
     */
    createCollection: function (collectionKey) {
        this.write(collectionKey, {});

    }

};

module.exports = LocalStorageDataProvider;
