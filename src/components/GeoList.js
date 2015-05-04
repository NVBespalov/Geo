'use strict';

var React = require('react/addons');

require('styles/GeoList.less');
var Tabs = require('react-simpletabs');
var TreeView = require('react-treeview');
var GeoList = React.createClass({
    
    render: function () {
        return (
            <div className="col2">
                <h1> Картографический сервис </h1>
                <Tabs>
                    <Tabs.Panel title='Категории'>
                        {this.props.dataSource.map(function (node, i) {
                            var label = <span className="node" > Type {i} </span>;
                            return (
                                <TreeView key={i} nodeLabel={label}>
                                    {node.map(function (entry) {
                                        return <div className="info" key={entry}>{entry}</div>;
                                    })}
                                </TreeView>
                            );
                        }, this)}
                    </Tabs.Panel>
                    <Tabs.Panel title='Поиск'>
                        <h2>Content #2 here</h2>
                    </Tabs.Panel>

                </Tabs>
            </div>
        );
    }
});

module.exports = GeoList;

