'use strict';

import React from 'react/addons';
import {GoogleMaps, Marker} from "react-google-maps";
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var _ = require('underscore');
const {update} = React.addons;
var geocoder = new google.maps.Geocoder();
require('styles/GeoObjectEditor.less');

/**
 * Get marker with marker raw data
 * @param marker
 * @returns {XML}
 */


var GeoObjectEditor = React.createClass({

    getInitialState: function () {
        return {
            markers: []
        };
    },
    /**
     * Set geo object editor address
     * @param latLng
     * @private
     */
    _setAddressFromLatLng: function (latLng) {
            geocoder.geocode({'latLng': latLng},this._getAddressCallback);
    },
    /**
     * Geo coder callback
     * @param results
     * @param status
     * @private
     */
    _getAddressCallback: function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                this.refs.newGeoObjectAddress.getDOMNode().value = results[0].formatted_address;
            }
            else {
                this.refs.newGeoObjectAddress.getDOMNode().value = "";
            }
        }
    },
    /**
     * Get marker with marker raw data
     * @param {object} marker The marker raw data
     * @param {int} index
     * @returns {XML}
     * @private
     */
    _getMarkerComponent: function (marker, index) {
        //var pinColor = "413316";
        //var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        //    new google.maps.Size(21, 34),
        //    new google.maps.Point(0,0),
        //    new google.maps.Point(10, 34));
        //var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        //    new google.maps.Size(40, 37),
        //    new google.maps.Point(0, 0),
        //    new google.maps.Point(12, 35));
        return (
            <Marker position={marker.position}
                    key={marker.key}
                    onRightclick={this._handle_marker_rightClick.bind(this, index)}
                    //icon={pinImage}
                />
        );
    },

    /**
     * Editor map click handler
     * @param event
     * @private
     */
    _handleMapClick: function (event) {
        var {markers} = this.state;
        markers = [{
            position: event.latLng,
            key: Date.now()
        }];
        this.setState({markers});
        this.refs.editorMap.panTo(event.latLng);
        this.refs.newGeoObjectLatitude.getDOMNode().value = event.latLng.lat();
        this.refs.newGeoObjectLongitude.getDOMNode().value = event.latLng.lng();
        this._setAddressFromLatLng(event.latLng);
    },

    /**
     * Marker right click handler
     * @param index
     * @param event
     * @private
     */
    _handle_marker_rightClick: function (index, event) {
        var {markers} = this.state;
        markers = update(markers, {
            $splice: [
                [index, 1]
            ]
        });
        this.setState({markers});
    },

    /**
     * Create new geo object with raw data
     * @param event
     */
    onAddNewGeoObjectPrompt: function (event) {
        GeoObjectsAction.addOneObject({
            name: this.refs.newGeoObjectName.getDOMNode().value,
            address: this.refs.newGeoObjectAddress.getDOMNode().value,
            latitude: this.refs.newGeoObjectLatitude.getDOMNode().value,
            longitude: this.refs.newGeoObjectLongitude.getDOMNode().value,
            category: this.refs.newGeoObjectCategory.getDOMNode().value
        });
        event.preventDefault();
    },

    /**
     * Get categories select field with options
     * @returns {XML}
     * @private
     */
    _getCategoriesSelectField: function () {
        var categoriesOptions = [<option key="000" defaultSelected value="Без категории">Без категории</option>];
        _.each(this.props.categories, function (value, key) {
            categoriesOptions.push(<option key={key} value={value}>{value}</option>);
        });

        return (
            <select name="category" ref="newGeoObjectCategory">
                {categoriesOptions}
            </select>
        );
    },

    render: function () {

        return (
            <form name="geoObjectEditor">

                <table border="0" cellSpacing="5" cellPadding="5">

                    <tr className="spaceUnder">
                        <td align="right" valign="top">Имя</td>
                        <td><input type="text" name="name" ref="newGeoObjectName"/></td>
                    </tr>

                    <tr className="spaceUnder">
                        <td align="right" valign="top">Адрес</td>
                        <td><input type="text" name="address" ref="newGeoObjectAddress"/></td>
                    </tr>

                    <tr className="spaceUnder">
                        <td align="right" valign="top">Широта</td>
                        <td>
                            <input type="text" name="latitude" ref="newGeoObjectLatitude"/>
                        </td>
                    </tr>

                    <tr className="spaceUnder">
                        <td align="right" valign="top">Долгота</td>
                        <td>
                            <input type="text" name="longitude" ref="newGeoObjectLongitude"/>
                        </td>
                    </tr>


                    <tr className="spaceUnder">
                        <td align="right" valign="top">Категория</td>
                        <td>
                            {this._getCategoriesSelectField()}
                        </td>
                    </tr>

                    <tr className="spaceUnder mapContainer">
                        <td align="right" valign="top">Карта</td>
                        <td>
                            <GoogleMaps containerProps={{style: {height: "100%",width: "100%"}}}
                                        ref="editorMap"
                                        googleMapsApi={google.maps}
                                        zoom={3}
                                        center={new google.maps.LatLng(0.0, 0.0)}
                                        onClick={this._handleMapClick}>
                                {this.state.markers.map(this._getMarkerComponent, this)}
                            </GoogleMaps>
                        </td>
                    </tr>

                    <tr className="controls">
                        <td align="right" colSpan="2">
                            <input type="button" value="Создать объект" onClick={this.onAddNewGeoObjectPrompt}/>
                            <input type="button" value="Отмена" onClick={this.onCancelNewGeoObject}/>
                        </td>
                    </tr>

                </table>

            </form>
        );
    }
});

module.exports = GeoObjectEditor;

