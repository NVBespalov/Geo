'use strict';

var React = require('react/addons');
var CategoriesStore = require('stores/CategoriesStore');
var GeoObjectsStore = require('stores/GeoObjectsStore');

require('normalize.css');
require('../styles/main.css');

/**
 * Retrieve the current Geo data from the store
 */
function getGeoState() {
    return {
        allCategories: CategoriesStore.getAllCategories() || [],
        allGeoObjects: GeoObjectsStore.getAllGeoObjects() || []
    };
}

var GeoList = require('components/GeoList');
var GeoDetails = require('components/GeoDetails');
var GeoApp = React.createClass({
    getInitialState: function() {
        return getGeoState();
    },
    componentDidMount: function() {
        CategoriesStore.addChangeListener(this._onChange);
        GeoObjectsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        CategoriesStore.removeChangeListener(this._onChange);
        GeoObjectsStore.removeChangeListener(this._onChange);
    },

    _listSelectGeoObjectHandler: function () {

    },

    render: function () {
        return (
        <div id="wrap">
            <h1> Картографический сервис </h1>
            <GeoList selectGeoObjectHandler={this._listSelectGeoObjectHandler} categories={this.state.allCategories} geoObjects={this.state.allGeoObjects}/>
            <GeoDetails categories={this.state.allCategories} geoObjects={this.state.allGeoObjects}/>
        </div>
        );
    },
    _onChange: function() {
        this.setState(getGeoState());
    }
});

module.exports = GeoApp;
