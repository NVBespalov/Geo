'use strict';

import React from "react/addons";
var MapComponent = require('components/Map');
var Modal = require('components/Modal');

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
    onCancelNewCategory: function (event) {
        this.refs.addCategoryModalForm.hide();
        event.preventDefault();
    },
    render: function () {
        return (
            <div className="right_col">
                <a onClick={this.handlePromptNewCategory} href="#">Новая категория</a>
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


                        </div>
                    </div>
                </div>
                <Modal
                    visible={false}
                    closable={true}
                    ref="addCategoryModalForm">
                    <header>
                        <h1>Новая категория</h1>
                    </header>

                    <form id="newCategoryForm">
                        <p className="categoryName">
                            <b className="label">Имя:</b>
                            <input type="text" />
                        </p>
                        <p className="controls">
                            <input type="button" value="Создать категорию" />
                            <input type="button" value="Отмена" onClick={this.onCancelNewCategory} />
                        </p>
                    </form>
                </Modal>
            </div>
        );
    }
});

module.exports = GeoDetails;

