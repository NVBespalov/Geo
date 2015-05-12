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
     * The action columns to show on the map or delete geo object
     * @param geoObject
     * @returns {XML[]}
     * @private
     */
    _getTableContentActionColumns: function (geoObject) {
        return [
            <Td key={'_' + Math.random().toString(36).substr(2, 9)} column="Карта" >
                <a key={'_' + Math.random().toString(36).substr(2, 9)} href="#">на карте</a>
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
                        <b key={'_' + Math.random().toString(36).substr(2, 9)}>{value}</b>
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

    render: function () {
        return (
            <Table itemsPerPage={this.state.itemsPerPage} className="geoTable">{this._getTableContent()}</Table>
        );
    }
});

module.exports = GeoObjectsTable;

