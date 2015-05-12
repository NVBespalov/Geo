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
        this.setState({geoEditorIsVisible:true});
        event.preventDefault();
    },

    /**
     * Handle user edit object prompt
     * @param event
     * @private
     */
    _editObjectHandler: function (event) {
        this.setState({
            geoObject:_.findWhere(this.props.geoObjects,{id:+event.target.getAttribute('data')}),
            geoEditorIsVisible:true
        });
    },

    /**
     * Cancel edit object handler
     * @private
     */
    _cancelObjectEditHandler: function () {
        this.setState({geoObject:{}, geoEditorIsVisible:false});
    },
    /**
     * Add one object handler
     * @private
     */
    _addNewObjectHandler: function () {
        this.setState({geoObject:{}, geoEditorIsVisible:false});
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
     * Get marker with marker raw data
     * @param {object} marker The marker raw data
     * @returns {XML}
     * @private
     */
    _getMarkerComponent: function (marker) {
        var pinColor = Math.floor(Math.random()*16777215).toString(16);
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
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

    getInitialState: function() {
        return {
            geoObject: {},
            geoEditorIsVisible: false,
            markers: [],
            mapZoomLevel: 2,
            mapCenter: new google.maps.LatLng(0, 0)

        };
    },
    getGeoObjectEditor: function () {
        if(this.state.geoEditorIsVisible){
            return(<GeoObjectEditor
                ref="geoObjectEditor"
                isVisible={this.state.geoEditorIsVisible}
                categories={this.props.categories}
                geoObject={this.state.geoObject}
                cancelObjectEditHandler={this._cancelObjectEditHandler}
                addNewObjectHandler={this._addNewObjectHandler}/>
            );
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var geoObject = nextProps.geoObject;
        var mapZoomLevel = this.state.mapZoomLevel;
        var mapCenter = this.state.mapCenter;
        if(geoObject.name) {
            mapCenter = new google.maps.LatLng(geoObject.latitude, geoObject.longitude);
            mapZoomLevel = nextProps.zoomLevel;
        }
        this.setState({geoObject, mapCenter, mapZoomLevel});
    },
    componentDidMount: function () {
        var markers = [];
        var marker;
        _.each(this.props.geoObjects, function (geoObject, index) {
            marker = this._getMarkerFromLatLng(geoObject.latitude, geoObject.longitude);
            if (marker) {
                marker.key = index;
                markers.push(marker);
            }
        }, this);
        this.setState({markers});
    },

    /**
     * Show object on map click handler
     * @param event
     */
    showObjectOnMapClickHandler: function (event) {
        this.refs.tabMap.getDOMNode().checked = true;
        var geoObject = _.findWhere(this.props.geoObjects,{id:+event.target.getAttribute('data')});
        this.setState({
            geoObject: geoObject,
            mapZoomLevel: 6,
            mapCenter: new google.maps.LatLng(geoObject.latitude, geoObject.longitude)
        });
    },

    render: function () {
        return (
            <div className="right_col">
                <div className="tabs">
                    <div className="tab">
                        <input ref="tabMap" type="radio" id="tab-map" name="tab-group-2" defaultChecked/>
                        <label htmlFor="tab-map">Карта</label>

                        <div className="content">
                            <GoogleMaps containerProps={{style: {height: "100%",width: "100%"}}}
                                        ref="map"
                                        googleMapsApi={google.maps}
                                        zoom={this.state.mapZoomLevel}
                                        center={this.state.mapCenter}
                                        >
                                {this.state.markers.map(this._getMarkerComponent, this)}
                            </GoogleMaps>

                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab-list" name="tab-group-2"/>
                        <label htmlFor="tab-list">Список</label>

                        <div className="content">
                            <p className="categoriesListControls">
                                <a onClick={this.handlePromptNewCategory} href="#">Новая категория</a>
                                <a onClick={this.showGeoObjectFormObject} href="#">Новый объект</a>
                            </p>

                            <GeoListTable showObjectOnMapClickHandler={this.showObjectOnMapClickHandler} geoObjects={this.props.geoObjects} editObjectHandler={this._editObjectHandler}/>

                        </div>
                    </div>
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
                                    <input type="button" value="Создать категорию" onClick={this.onAddNewCategoryPrompt}/>
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

