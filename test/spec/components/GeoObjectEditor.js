'use strict';

describe('GeoObjectEditor', function () {
    var React = require('react/addons');
    var GeoObjectEditor, component;

    beforeEach(function () {
        GeoObjectEditor = require('components/GeoObjectEditor.js');
        component = React.createElement(GeoObjectEditor);
    });

    it('should create a new instance of GeoObjectEditor', function () {
        expect(component).toBeDefined();
    });
});
