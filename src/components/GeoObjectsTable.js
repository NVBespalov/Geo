'use strict';

var React = require('react/addons');
var ReactTable = require('reactable');
var Table = ReactTable.Table;
var Tr = ReactTable.Tr, Td = ReactTable.Td;
var GeoObjectsAction = require('actions/GeoObjectActionCreators');
var _ = require('underscore');

require('styles/GeoObjectsTable.less');

var GeoObjectsTable = React.createClass({

    getInitialState: function() {
        return {
            columns:[
                {key:"name", label:"Имя"},
                {key:"address", label:"Адрес"},
                {key:"latitude", label:"Широта"},
                {key:"longitude", label:"Долгота"},
                {key:"category", label:"Категория"}
            ],
            itemsPerPage:25
        };
    },
    /**
     * Handle user delete object prompt
     * @param event
     * @private
     */
    _deleteObjectHandler: function (event) {
        GeoObjectsAction.deleteObject(_.findWhere(this.props.geoObjects,{id:+event.target.getAttribute('data')}));
    },

    /**
     * Handle user edit object prompt
     * @param event
     * @private
     */
    _editObjectHandler: function (event) {
        this.props.editObjectHandler(event);
    },

    /**
     * Show go object on the map click handler
     * @param event
     * @private
     */
    _onShowObjectOnMapClickHandler: function (event) {
        this.props.showObjectOnMapClickHandler(event);
    },
    /**
     * The action columns to show on the map or delete geo object
     * @param geoObject
     * @returns {XML[]}
     * @private
     */
    _getTableContentActionColumns: function (geoObject) {
        return [
            <Td key={'_' + Math.random().toString(36).substr(2, 9)} column="Карта" >
                <a data={geoObject.id} key={'_' + Math.random().toString(36).substr(2, 9)} href="#" onClick={this._onShowObjectOnMapClickHandler}>на карте</a>
            </Td>,
            <Td key={'_' + Math.random().toString(36).substr(2, 9)} column="Действия">
                <b key={'_' + Math.random().toString(36).substr(2, 9)}>
                    <a key={'_' + Math.random().toString(36).substr(2, 9)} href="#" data={geoObject.id} onClick={this._editObjectHandler}>Редактировать</a>
                    <br/>
                    <a key={'_' + Math.random().toString(36).substr(2, 9)} href="#" onClick={this._deleteObjectHandler} data={geoObject.id}>Удалить</a>
                </b>
            </Td>
        ];

    },

    /**
     * Get the geo objects table row structure
     * @param geoObject
     * @private
     */
    _getTableContentColumns: function (geoObject) {
        var geoObjectTableContentColumns = [];
        var _this = this;
        _.each(geoObject, function (value, key) {
            var column = _.findWhere(_this.state.columns,{key:key});
            if (column) {
                geoObjectTableContentColumns.push(
                    <Td key={'_' + Math.random().toString(36).substr(2, 9)} column={column.label} data={value}>
                        {value}
                    </Td>
                );
            }
        });
        return _.union(geoObjectTableContentColumns, this._getTableContentActionColumns(geoObject));
    },

    /**
     * Get the geo object table structure
     * @returns {Array}
     * @private
     */
    _getTableContent: function () {
        var geoObjectTableContent = [];
        var _this = this;
        _.each(this.props.geoObjects, function (geoObject) {
            geoObjectTableContent.push(
                <Tr key={'_' + Math.random().toString(36).substr(2, 9)}>
                    {_this._getTableContentColumns(geoObject)}
                </Tr>
            );
        });
        return geoObjectTableContent;
    },

    /**
     * Slect count of pages per page handler
     * @param event
     * @private
     */
    _onPagesContSelectorChanged: function (event) {
        this.setState({itemsPerPage:event.target.value});
    },

    render: function () {
        return (
            <div id="demo-table">
                <Table itemsPerPage={this.state.itemsPerPage} sortable={true}>
                    {this._getTableContent()}
                </Table>
                <select id="pagesCountSelector" onChange={this._onPagesContSelectorChanged}>
                    <option> 5 </option>
                    <option> 10 </option>
                    <option> 15 </option>
                    <option> 20 </option>
                </select>
            </div>
        );
    }
});

module.exports = GeoObjectsTable;

