'use strict';

import React from "react/addons";
var MapComponent = require('components/Map');

require('styles/GeoDetails.less');

var GeoDetails = React.createClass({
    render: function () {
        return (
            <div className="right_col">
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-map" name="tab-group-2" defaultChecked/>
                        <label htmlFor="tab-map">Карта</label>

                        <div className="content">
                            <MapComponent />
                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab-list" name="tab-group-2" />
                        <label htmlFor="tab-list">Список</label>

                        <div className="content">


                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = GeoDetails;

