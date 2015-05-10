'use strict';

import React from "react/addons";
var MapComponent = require('components/Map');
var Modal = require('components/Modal');
var CategoriesAction = require('actions/CategoriesActionCreators');
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var GeoListTable = require('reactable').Table;
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
                        <input type="radio" id="tab-list" name="tab-group-2" />
                        <label htmlFor="tab-list">Список</label>

                        <div className="content">
                            <p className="categoriesListControls">
                                <a onClick={this.handlePromptNewCategory} href="#" >Новая категория</a>
                                <a onClick={this.showGeoObjectFormObject} href="#" >Новый объект</a>
                            </p>

                            <GeoListTable className="geoTable" data={[

                            ]} />

                        </div>
                    </div>

                </div>
                <Modal visible={false} closable={true} ref="addCategoryModalForm">
                    <header>
                        <h1>Новая категория</h1>
                    </header>

                    <form id="newCategoryForm">
                        <p className="categoryName">
                            <b className="label">Имя:</b>
                            <input type="text" ref="newCategoryName" />
                        </p>
                        <p className="controls">
                            <input type="button" value="Создать категорию" onClick={this.onAddNewCategoryPrompt}/>
                            <input type="button" value="Отмена" onClick={this.onCancelNewCategory} />
                        </p>
                    </form>
                </Modal>
                <Modal visible={true} closable={true} ref="addGeoObjectModalForm">
                    <header>
                        <h1>Новый объект</h1>
                    </header>

                    <form id="newGeoObjectForm">
                        <p>
                            <b className="label">Имя</b>
                            <input type="text" ref="geoObjectName" />
                        </p>
                        <p>
                            <b className="label">Адрес</b>
                            <input type="text" ref="geoObjectAddress" />
                        </p>
                        <p>
                            <b className="label">Широта</b>
                            <input type="text" ref="geoObjectLatitude" />
                        </p>
                        <p>
                            <b className="label">Долгота</b>
                            <input type="text" ref="geoObjectLongitude" />
                        </p>
                        <p>
                            <b className="label">Категория</b>
                            <select ref="geoObjectCategory" >
                                <option value="empty" defaultValue>Без категории</option>
                            </select>
                        </p>
                        <p>
                            <b className="label">Карта</b>
                            <MapComponent className="editorMap"/>

                        </p>
                        <p className="controls">
                            <input type="button" value="Создать объект" onClick={this.onAddNewGeoObjectPrompt}/>
                            <input type="button" value="Отмена" onClick={this.onCancelNewGeoObject} />
                        </p>
                    </form>
                </Modal>
            </div>
        );
    }
});

module.exports = GeoDetails;

