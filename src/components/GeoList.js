'use strict';

var React = require('react/addons');

require('styles/GeoList.less');
var Tabs = require('react-simpletabs');

var GeoList = React.createClass({
  render: function () {
    return (
        <div className="col2">
            <h1> Картографический сервис </h1>
            <Tabs>
                <Tabs.Panel title='Tab #1'>
                    <h2>Content #1 here</h2>
                </Tabs.Panel>
                <Tabs.Panel title='Tab #2'>
                    <h2>Content #2 here</h2>
                </Tabs.Panel>
                <Tabs.Panel title='Tab #3'>
                    <h2>Content #3 here</h2>
                </Tabs.Panel>
            </Tabs>
        </div>
      );
  }
});

module.exports = GeoList;

