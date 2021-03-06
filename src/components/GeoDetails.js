'use strict';

import React from 'react/addons';
import {GoogleMaps, Marker} from 'react-google-maps';
var MapComponent = require('components/Map');
var Modal = require('components/Modal');
var CategoriesAction = require('actions/CategoriesActionCreators');
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var GeoListTable = require('components/GeoObjectsTable');
var GeoObjectEditor = require('components/GeoObjectEditor');
var _ = require('underscore');

require('styles/GeoDetails.less');

var GeoDetails = React.createClass({

    /**
     * Click handler for new category prompt
     * @param event
     */
    handlePromptNewCategory: function (event) {
        this.refs.addCategoryModalForm.show();
        event.preventDefault();
    },

    /**
     * Add new category form cancel button handler
     * @param event
     */
    onCancelNewCategory: function (event) {
        this.refs.addCategoryModalForm.hide();
        event.preventDefault();
    },

    /**
     * Create new category with raw data
     * @param event
     */
    onAddNewCategoryPrompt: function (event) {
        CategoriesAction.addOneCategory({
            name: this.refs.newCategoryName.getDOMNode().value
        });
        event.preventDefault();
    },

    /**
     * Click handler for new geo object
     * @param event
     */
    showGeoObjectFormObject: function (event) {
        this.setState({geoEditorIsVisible: true});
        event.preventDefault();
    },

    /**
     * Handle user edit object prompt
     * @param event
     * @private
     */
    _editObjectHandler: function (event) {
        this.setState({
            geoObject: _.findWhere(this.props.geoObjects, {id: +event.target.getAttribute('data')}),
            geoEditorIsVisible: true
        });
    },

    /**
     * Cancel edit object handler
     * @private
     */
    _cancelObjectEditHandler: function () {
        this.setState({geoObject: {}, geoEditorIsVisible: false});
    },
    /**
     * Add one object handler
     * @private
     */
    _addNewObjectHandler: function () {
        this.setState({geoObject: {}, geoEditorIsVisible: false});
    },
    /**
     * Get map marker from given lat & lng coordinates
     * @param lat
     * @param lng
     * @private
     * @returns {object/undefined}
     */
    _getMarkerFromLatLng: function (lat, lng) {
        var marker;
        if (!isNaN(parseInt(lat)) && !isNaN(parseInt(lng))) {
            marker = {
                position: new google.maps.LatLng(lat, lng)
            };
        }
        return marker;
    },

    /**
     * Generate hex color. Returns color without #
     * @returns {string}
     * @private
     */
    _getRandomColor: function () {
        var generatedColor = Math.round(0xffffff * Math.random()).toString(16);
        var generatedColorDelta = (6 - generatedColor.length);
        var additionMask = "000000";
        var missingPrefix = additionMask.substring(0, generatedColorDelta);
        return missingPrefix + generatedColor;
    },

    /**
     * Get marker with marker raw data
     * @param {object} marker The marker raw data
     * @returns {XML}
     * @private
     */
    _getMarkerComponent: function (marker) {
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this._getRandomColor(),
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
        //var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        //    new google.maps.Size(40, 37),
        //    new google.maps.Point(0, 0),
        //    new google.maps.Point(12, 35));
        return (
            <Marker position={marker.position}
                    key={marker.key}
                    icon={pinImage}
                />
        );
    },

    getInitialState: function () {
        return {
            geoObject: {},
            geoEditorIsVisible: false,
            mapZoomLevel: 2,
            mapCenter: new google.maps.LatLng(0, 0),
            selectedLayer: ''

        };
    },
    getGeoObjectEditor: function () {
        if (this.state.geoEditorIsVisible) {
            return (<GeoObjectEditor
                ref="geoObjectEditor"
                isVisible={this.state.geoEditorIsVisible}
                categories={this.props.categories}
                geoObject={this.state.geoObject}
                cancelObjectEditHandler={this._cancelObjectEditHandler}
                addNewObjectHandler={this._addNewObjectHandler}/>
            );
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var geoObject = nextProps.geoObject;
        var mapZoomLevel = this.state.mapZoomLevel;
        var mapCenter = this.state.mapCenter;
        if (geoObject.name) {
            mapCenter = new google.maps.LatLng(geoObject.latitude, geoObject.longitude);
            mapZoomLevel = nextProps.zoomLevel;
        }
        this.setState({geoObject, mapCenter, mapZoomLevel});
    },
    componentDidMount: function () {

    },

    /**
     * Show object on map click handler
     * @param event
     */
    showObjectOnMapClickHandler: function (event) {
        this.refs.tabMap.getDOMNode().checked = true;
        var geoObject = _.findWhere(this.props.geoObjects, {id: +event.target.getAttribute('data')});
        this.setState({
            geoObject: geoObject,
            mapZoomLevel: 6,
            mapCenter: new google.maps.LatLng(geoObject.latitude, geoObject.longitude)
        });
    },

    /**
     * Layer selected handler
     * @param event
     * @private
     */
    _onCategoryLayerSelected: function (event) {
        this.setState({selectedLayer: event.target.value});
    },
    _getMarkers: function () {
        var markers = [];
        var marker;
        var selectedLayer = this.state.selectedLayer || _.first(this.props.categories);
        _.each(_.where(this.props.geoObjects, {category: selectedLayer}), function (geoObject, index) {
            marker = this._getMarkerFromLatLng(geoObject.latitude, geoObject.longitude);
            if (marker) {
                marker.key = index;
                markers.push(this._getMarkerComponent(marker));
            }
        }, this);
        return markers;
    },

    /**
     * Clear selected geo object on tab changed
     * @private
     */
    _clearSelectedObject: function () {
        this.setState({geoObject: {}});
    },

    render: function () {
        return (
            <div className="col1">

                <div className="tabs">
                    <input ref="tabMap" id="tab1" type="radio" name="tabs-details" defaultChecked/>
                    <label htmlFor="tab1" title="Карта">Карта</label>

                    <input id="tab2" type="radio" name="tabs-details" onChange={this._clearSelectedObject}/>
                    <label htmlFor="tab2" title="Поиск">Поиск</label>

                    <section id="content1">
                        <GoogleMaps containerProps={{style: {height: "700px",width: "100%"}}}
                                    ref="map"
                                    googleMapsApi={google.maps}
                                    zoom={this.state.mapZoomLevel}
                                    center={this.state.mapCenter}
                            >
                            {this._getMarkers()}
                        </GoogleMaps>
                        <form>
                            <select id="layersSelector" onChange={this._onCategoryLayerSelected}>
                                {this.props.categories.map(function (category) {
                                    return (<option key={category}>{category}</option>);
                                })}
                            </select>
                        </form>
                    </section>
                    <section id="content2">
                        <p className="categoriesListControls">
                            <a onClick={this.handlePromptNewCategory} href="#">Новая категория</a>
                            <a onClick={this.showGeoObjectFormObject} href="#">Новый объект</a>
                        </p>

                        <GeoListTable showObjectOnMapClickHandler={this.showObjectOnMapClickHandler}
                                      geoObjects={this.props.geoObjects} editObjectHandler={this._editObjectHandler}/>

                    </section>
                </div>
                <Modal visible={false} closable={true} ref="addCategoryModalForm">
                    <header>
                        <h1>Новая категория</h1>
                    </header>
                    <table border="0" cellSpacing="5" cellPadding="5">
                        <form className="modalForm">
                            <tr className="spaceUnder">
                                <td align="right" valign="top">Имя</td>
                                <td><input type="text" name="name" size="25" ref="newCategoryName"/></td>
                            </tr>
                            <tr>
                                <td align="right" colSpan="2">
                                    <input type="button" value="Создать категорию"
                                           onClick={this.onAddNewCategoryPrompt}/>
                                    <input type="button" value="Отмена" onClick={this.onCancelNewCategory}/>
                                </td>
                            </tr>

                        </form>
                    </table>
                </Modal>
                {this.getGeoObjectEditor()}
            </div>

        );
    }
});

module.exports = GeoDetails;

