'use strict';

describe('GeoList', function () {
  var React = require('react/addons');
  var GeoList, component;

  beforeEach(function () {
    GeoList = require('components/GeoList.js');
    component = React.createElement(GeoList);
  });

  it('should create a new instance of GeoList', function () {
    expect(component).toBeDefined();
  });
});
