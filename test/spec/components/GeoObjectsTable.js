'use strict';

describe('GeoObjectsTable', function () {
    var React = require('react/addons');
    var GeoObjectsTable, component;

    beforeEach(function () {
        GeoObjectsTable = require('components/GeoObjectsTable.js');
        component = React.createElement(GeoObjectsTable);
    });

    it('should create a new instance of GeoObjectsTable', function () {
        expect(component).toBeDefined();
    });
});
