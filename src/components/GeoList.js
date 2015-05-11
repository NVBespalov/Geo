'use strict';

var React = require('react/addons');
var TreeView = require('react-treeview');
var _ = require('underscore');

require('styles/GeoList.less');

function getCategoriesWithGeoObjects (categories, geoObjects) {
    var categoriesWithObjects = [];
    _.each(categories, function (value) {
        categoriesWithObjects.push({
            name: value,
            collapsed: false,
            geoObjects: _.where(geoObjects, {category:value})
        });
    });
    return categoriesWithObjects;

}

var GeoList = React.createClass({

    render: function () {
        return (

            <div className="left_col">

                <div className="tabs">

                    <div className="tab">
                        <input type="radio" id="tab-categories" name="tab-group-1" defaultChecked/>
                        <label htmlFor="tab-categories">Категории</label>

                        <div className="content">
                            {getCategoriesWithGeoObjects(this.props.categories, this.props.geoObjects).map(function(node, index) {
                                var type = node.name;
                                var label = <span className="node">{type}</span>;
                                return (
                                    <TreeView key={type + '|' + index} nodeLabel={label} defaultCollapsed={false}>
                                        {node.geoObjects.map(function(geoObject) {
                                            return (
                                                <p><a key={'_' + Math.random().toString(36).substr(2, 9)} className="node" href="#">{geoObject.name}</a></p>
                                            );
                                        })}
                                    </TreeView>
                                );
                            }, this)}
                        </div>
                    </div>

                    <div className="tab">
                        <input type="radio" id="tab-search" name="tab-group-1"/>
                        <label htmlFor="tab-search">Поиск</label>

                        <div className="content">
                            stuff
                        </div>
                    </div>


                </div>


            </div>
        );
    }
});

module.exports = GeoList;

