'use strict';

var React = require('react/addons');
var TreeView = require('react-treeview');

require('styles/GeoList.less');

var GeoList = React.createClass({

    render: function () {
        return (

            <div className="left_col">

                <div className="tabs">

                    <div className="tab">
                        <input type="radio" id="tab-categories" name="tab-group-1" defaultChecked/>
                        <label htmlFor="tab-categories">Категории</label>

                        <div className="content">
                            {this.props.categories.map(function (node, i) {
                                var label = <span className="node" > Type {i} </span>;
                                return (
                                    <TreeView key={i} nodeLabel={label}>
                                        {node.map(function (entry) {
                                            return <div className="info" key={entry}>{entry}</div>;
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

