'use strict';

describe('Modal', function () {
    var React = require('react/addons');
    var Modal, component;

    beforeEach(function () {
        Modal = require('components/Modal.js');
        component = React.createElement(Modal);
    });

    it('should create a new instance of Modal', function () {
        expect(component).toBeDefined();
    });
});
