'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var GeoAppDispatcher = require('../dispatcher/GeoAppDispatcher');

var GeoObjectsStore = assign({}, EventEmitter.prototype, {});

GeoObjectsStore.dispatchToken = GeoAppDispatcher.register(function (action) {

    switch (action.type) {
        default:
    }

});

module.exports = GeoObjectsStore;
