'use strict';

import React from 'react/addons';
import {GoogleMaps, Marker} from 'react-google-maps';
var MapComponent = require('components/Map');
var Modal = require('components/Modal');
var CategoriesAction = require('actions/CategoriesActionCreators');
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var GeoListTable = require('components/GeoObjectsTable');
var GeoObjectEditor = require('components/GeoObjectEditor');

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
        this.refs.geoObjectEditor.show();
        event.preventDefault();
    },






    render: function () {

        return (
            <div className="right_col">
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-map" name="tab-group-2" defaultChecked/>
                        <label htmlFor="tab-map">Карта</label>

                        <div className="content">
                            <GoogleMaps containerProps={{style: {height: "100%",width: "100%"}}}
                                        ref="map"
                                        googleMapsApi={google.maps}
                                        zoom={4}
                                        center={new google.maps.LatLng(-25.363882, 131.044922)}
                                        />

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

                            <GeoListTable geoObjects={this.props.geoObjects} />

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
                <GeoObjectEditor ref="geoObjectEditor" categories={this.props.categories} geoObject={{}}/>
            </div>
        );
    }
});

module.exports = GeoDetails;

