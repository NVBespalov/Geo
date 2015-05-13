'use strict';

var React = require('react/addons');
var CategoriesStore = require('stores/CategoriesStore');
var GeoObjectsStore = require('stores/GeoObjectsStore');
var _ = require('underscore');

require('normalize.css');
require('../styles/main.css');

/**
 * Retrieve the current Geo data from the store
 */
function getGeoState() {
    return {
        allCategories: CategoriesStore.getAllCategories() || [],
        allGeoObjects: GeoObjectsStore.getAllGeoObjects() || [],
        selectedGeoObject: {},
        selectedGeoObjectZoom: 2
    };
}

var GeoList = require('components/GeoList');
var GeoDetails = require('components/GeoDetails');
var GeoApp = React.createClass({
    getInitialState: function () {
        return getGeoState();
    },
    componentDidMount: function () {
        CategoriesStore.addChangeListener(this._onChange);
        GeoObjectsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CategoriesStore.removeChangeListener(this._onChange);
        GeoObjectsStore.removeChangeListener(this._onChange);
    },

    /**
     * Object categories selected handler
     * @param  event
     * @private
     */
    _listSelectGeoObjectHandler: function (event) {
        var selectedGeoObject = _.findWhere(this.state.allGeoObjects, {id: +event.target.getAttribute('data')});
        this.setState({selectedGeoObject, selectedGeoObjectZoom: 8});
    },

    render: function () {
        return (
            <div className = "wrap">
                <h1> Картографический сервис </h1>
                <div className="colmask leftmenu">
                    <div className="colleft">


                        <GeoDetails zoomLevel={this.state.selectedGeoObjectZoom} geoObject={this.state.selectedGeoObject}
                                    categories={this.state.allCategories} geoObjects={this.state.allGeoObjects}/>
                        <GeoList selectGeoObjectHandler={this._listSelectGeoObjectHandler}
                                 categories={this.state.allCategories} geoObjects={this.state.allGeoObjects}/>
                    </div>
                </div>
            </div>
        );
    },
    _onChange: function () {
        this.setState(getGeoState());
    }
});

module.exports = GeoApp;
