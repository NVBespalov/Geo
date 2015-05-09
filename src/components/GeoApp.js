'use strict';

var React = require('react/addons');

require('normalize.css');
require('../styles/main.css');

var GeoList = require('components/GeoList');
var GeoDetails = require('components/GeoDetails');
var GeoApp = React.createClass({
    render: function () {
        return (
        <div id="wrap">
            <h1> Картографический сервис </h1>
            <GeoList categories={[]}/>
            <GeoDetails />

        </div>
        );
    }
});

module.exports = GeoApp;
