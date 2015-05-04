'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');
var GeoList = require('components/GeoList');
var GeoDetails = require('components/GeoDetails');
var GeoApp = React.createClass({
    render: function () {
        return (

            <div className="colmask leftmenu">
                <div className="colleft">
                    <GeoDetails />
                    <GeoList />
                </div>
            </div>

        );
    }
});

module.exports = GeoApp;
