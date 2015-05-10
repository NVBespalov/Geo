'use strict';

import React from "react/addons";
var MapComponent = require('components/Map');
var Modal = require('components/Modal');
var CategoriesAction = require('actions/CategoriesActionCreators');
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var GeoListTable = require('reactable').Table;
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
        CategoriesAction.addOneCategory({
            name: this.refs.addGeoObjectModalForm.show()
        });
        event.preventDefault();
    },

    /**
     * Create new geo object with raw data
     * @param event
     */
    onAddNewGeoObjectPrompt: function (event) {
        GeoObjectsAction.addOneObject({
            name: this.refs.newGeoObjectName.getDOMNode().value,
            addres: this.refs.newGeoObjectAddress.getDOMNode().value,
            latitude: this.refs.newGeoObjectLatitude.getDOMNode().value,
            longitude: this.refs.newGeoObjectLongitude.getDOMNode().value,
            category: this.refs.newGeoObjectCategory.getDOMNode().value
        });
        event.preventDefault();
    },


    /**
     * Add new geo object form cancel button handler
     * @param event
     */
    onCancelNewGeoObject: function (event) {
        this.refs.addGeoObjectModalForm.hide();
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
                            <MapComponent />
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

                            <GeoListTable className="geoTable" data={_.toArray(this.props.geoObjects)}/>

                        </div>
                    </div>
                </div>
                <Modal visible={false} closable={true} ref="addCategoryModalForm">
                    <header>
                        <h1>Новая категория</h1>
                    </header>
                    <table border="0" cellspacing="5" cellpadding="5">
                        <form className="modalForm">
                            <tr className="spaceUnder">
                                <td align="right" valign="top">Имя</td>
                                <td><input type="text" name="name" size="25" ref="newCategoryName"/></td>
                            </tr>
                            <tr>
                                <td align="right" colspan="2">
                                    <input type="button" value="Создать категорию" onClick={this.onAddNewCategoryPrompt}/>
                                    <input type="button" value="Отмена" onClick={this.onCancelNewCategory}/>
                                </td>
                            </tr>

                        </form>
                    </table>
                </Modal>
                <Modal visible={false} closable={true} ref="addGeoObjectModalForm">
                    <header>
                        <h1>Новый объект</h1>
                    </header>
                    <form name="newGeoObject">

                        <table border="0" cellspacing="5" cellpadding="5">

                            <tr className="spaceUnder">
                                <td align="right" valign="top">Имя</td>
                                <td><input type="text" name="name" size="25" ref="newGeoObjectName"/></td>
                            </tr>

                            <tr className="spaceUnder">
                                <td align="right" valign="top">Адрес</td>
                                <td><input type="text" name="address" size="25" ref="newGeoObjectAddress"/></td>
                            </tr>

                            <tr className="spaceUnder">
                                <td align="right" valign="top">Широта</td>
                                <td>
                                    <input type="text" name="latitude" size="25" ref="newGeoObjectLatitude"/>
                                </td>
                            </tr>

                            <tr className="spaceUnder">
                                <td align="right" valign="top">Долгота</td>
                                <td>
                                    <input type="text" name="longitude" size="25" ref="newGeoObjectLongitude"/>
                                </td>
                            </tr>


                            <tr className="spaceUnder">
                                <td align="right" valign="top">Категория</td>
                                <td>
                                    <select name="category" ref="newGeoObjectCategory">
                                        <option defaultSelected value="empty">Без категории</option>
                                    </select>
                                </td>
                            </tr>

                            <tr className="spaceUnder">
                                <td align="right" valign="top">Карта</td>
                                <td>
                                    <MapComponent />
                                </td>
                            </tr>

                            <tr>
                                <td align="right" colspan="2">
                                    <input type="button" value="Создать объект" onClick={this.onAddNewGeoObjectPrompt}/>
                                    <input type="button" value="Отмена" onClick={this.onCancelNewGeoObject} />
                                </td>
                            </tr>

                        </table>

                    </form>
                </Modal>
            </div>
        );
    }
});

module.exports = GeoDetails;

