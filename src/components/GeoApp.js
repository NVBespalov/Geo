'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');
var GeoList = require('components/GeoList');

var GeoApp = React.createClass({
    render: function () {
        return (

            <div className="colmask leftmenu">
                <div className="colleft">
                    <div className="col1">

                    </div>
                    <GeoList />
                </div>
            </div>

        );
    }
});

module.exports = GeoApp;
