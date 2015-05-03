'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var GeoApp = React.createClass({
    render: function () {
        return (

            <div className="colmask leftmenu">
                <div className="colleft">
                    <div className="col1">

                    </div>
                    <div className="col2">

                    </div>
                </div>
            </div>

        );
    }
});

module.exports = GeoApp;
