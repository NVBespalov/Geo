'use strict';

var React = require('react/addons');
var CategoriesStore = require('stores/CategoriesStore');
require('normalize.css');
require('../styles/main.css');

/**
 * Retrieve the current Geo data from the store
 */
function getGeoState() {
    return {
        allCategories: CategoriesStore.getAllCategories() || {}
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
    },

    componentWillUnmount: function() {
        CategoriesStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
        <div id="wrap">
            <h1> Картографический сервис </h1>
            <GeoList />
            <GeoDetails categories={this.state.allCategories}/>

        </div>
        );
    },
    _onChange: function() {
        this.setState(getGeoState());
    }
});

module.exports = GeoApp;
