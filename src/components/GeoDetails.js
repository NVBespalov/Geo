'use strict';

var React = require('react/addons');

require('styles/GeoDetails.less');
var Tabs = require('react-simpletabs');
var GeoDetails = React.createClass({
    render: function () {
        return (
            <div className="col1">
                <Tabs>
                    <Tabs.Panel title='Карта'>
                        <h2>Content #2 here</h2>
                    </Tabs.Panel>
                    <Tabs.Panel title='Список'>
                        <h2>Content #2 here</h2>
                    </Tabs.Panel>

                </Tabs>
            </div>
        );
    }
});

module.exports = GeoDetails;

