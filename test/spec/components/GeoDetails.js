'use strict';

describe('GeoDetails', function () {
    var React = require('react/addons');
    var GeoDetails, component;

    beforeEach(function () {
        window.google = {
            maps: {
                Geocoder: function () {

                }
            }
        };
        GeoDetails = require('components/GeoDetails.js');
        component = React.createElement(GeoDetails);
    });

    it('should create a new instance of GeoDetails', function () {
        expect(component).toBeDefined();
    });
});
