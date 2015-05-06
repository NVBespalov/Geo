'use strict';

describe('Map', function () {
  var React = require('react/addons');
  var Map, component;

  beforeEach(function () {
    Map = require('components/Map.js');
    component = React.createElement(Map);
  });

  it('should create a new instance of Map', function () {
    expect(component).toBeDefined();
  });
});
