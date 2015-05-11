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
            ]
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
            <Td column="Карта" r>
                <a href="#">на карте</a>
            </Td>,
            <Td column="Действия">
                <b>
                    <a href="#" data={geoObject.id} onClick={this._editObjectHandler}>Редактировать</a>
                    <br/>
                    <a href="#" onClick={this._deleteObjectHandler} data={geoObject.id}>Удалить</a>
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
                    <Td column={column.label} data={value}>
                        <b>{value}</b>
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
                <Tr>
                    {_this._getTableContentColumns(geoObject)}
                </Tr>
            );
        });
        return geoObjectTableContent;
    },

    render: function () {
        return (
            <Table className="geoTable">{this._getTableContent()}</Table>
        );
    }
});

module.exports = GeoObjectsTable;

