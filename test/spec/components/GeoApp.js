'use strict';

describe('GeoApp', function () {
  var React = require('react/addons');
  var GeoApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GeoApp = require('components/GeoApp.js');
    component = React.createElement(GeoApp);
  });

  it('should create a new instance of GeoApp', function () {
    expect(component).toBeDefined();
  });
});
