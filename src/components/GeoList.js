'use strict';

var React = require('react/addons');
var TreeView = require('react-treeview');
var _ = require('underscore');

require('styles/GeoList.less');

function getCategoriesWithGeoObjects(categories, geoObjects) {
    var categoriesWithObjects = [];
    _.each(categories, function (value) {
        categoriesWithObjects.push({
            name: value,
            collapsed: false,
            geoObjects: _.where(geoObjects, {category: value})
        });
    });
    return categoriesWithObjects;

}

var GeoList = React.createClass({
    /**
     * Select object from tree handler
     * @param event
     * @private
     */
    _onGeoObjectClick: function (event) {
        this.props.selectGeoObjectHandler(event);
    },

    /**
     * Search field handler
     * @param event
     * @private
     */
    _searchFieldChangedHandler: function (event) {
        if (event.target.value) {
            var searchResults = _.filter(this.props.geoObjects, function (item) {
                return item.name.indexOf(event.target.value) > -1;
            });
            if (searchResults) {
                this.setState({searchResults});
            }
        }
    },

    getInitialState: function() {
        return {
            searchResults: []
        };
    },
    render: function () {
        return (

            <div className="left_col">

                <div className="tabs">

                    <div className="tab">
                        <input type="radio" id="tab-categories" name="tab-group-1" defaultChecked/>
                        <label htmlFor="tab-categories">Категории</label>

                        <div className="content">
                            {getCategoriesWithGeoObjects(this.props.categories, this.props.geoObjects).map(function (node, index) {
                                var type = node.name;
                                var label = <span className="node">{type}</span>;
                                return (
                                    <TreeView key={type + '|' + index} nodeLabel={label} defaultCollapsed={false}>
                                        {node.geoObjects.map(function (geoObject) {
                                            return (
                                                <p key={'_' + Math.random().toString(36).substr(2, 9)}>
                                                    <a
                                                        key={'_' + Math.random().toString(36).substr(2, 9)}
                                                        className="node" href="#"
                                                        onClick={this._onGeoObjectClick} data={geoObject.id}>
                                                        {geoObject.name}
                                                    </a>
                                                </p>
                                            );
                                        }, this)}
                                    </TreeView>
                                );
                            },this)}
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-search" name="tab-group-1"/>
                        <label htmlFor="tab-search">Поиск</label>

                        <div className="content">
                            <form id="search">
                                <input onChange={this._searchFieldChangedHandler} name="q" type="text" size="40" placeholder="Собор" />
                            </form>
                            <ul className="searchResults">
                                <h3>Результаты:</h3>
                                {this.state.searchResults.map(function (geoObject, index) {
                                    return (<a onClick={this._onGeoObjectClick} href="#" key={index} ><li data={geoObject.id} key={index+1}>{geoObject.name}</li></a>);
                                }, this)}
                            </ul>
                        </div>

                    </div>


                </div>


            </div>
        );
    }
});

module.exports = GeoList;

