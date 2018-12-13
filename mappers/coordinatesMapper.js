const mostMapper = require('../assets/coordinatesMappers/most');
const leastMapper = require('../assets/coordinatesMappers/least');
const compositeMapper = require('../assets/coordinatesMappers/composite');
const _ = require('underscore');

module.exports = {
  mapCoordinates: function(type, coordinates) {
    let mappedCoordinates = [];
    let mapper = {};
    coordinates = JSON.parse(coordinates);

    switch(type) {
      case 'most':
        mapper = mostMapper;
        break;
      case 'least':
        mapper = leastMapper;
        break;
      case 'composite':
        mapper = compositeMapper;
        break;
      default:
        mapper = compositeMapper;
    }
    mappedCoordinates = Object.values(coordinates);
    mappedCoordinates = Object.keys(coordinates).map(i => coordinates[i]);
    mappedCoordinates.map((value, i) => {
      if (i === 0) {
        mappedCoordinates[i] = _.findWhere(mapper.d, {'axis': parseInt(value)}).value
      }
      if (i === 1) {
        mappedCoordinates[i] = _.findWhere(mapper.i, {'axis': parseInt(value)}).value
      }
      if (i === 2) {
        mappedCoordinates[i] = _.findWhere(mapper.s, {'axis': parseInt(value)}).value
      }
      if (i === 3) {
        mappedCoordinates[i] = _.findWhere(mapper.c, {'axis': parseInt(value)}).value
      }
    });
    return mappedCoordinates;
  }
};