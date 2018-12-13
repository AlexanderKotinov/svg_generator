const strengthsWordsSet = require('../assets/coordinatesMappers/strengthsWordSet');
const weaknessesWordsSet = require('../assets/coordinatesMappers/weaknessesWordSet');
const mapper = require('../mappers/coordinatesMapper');
const linesGenerator = require('../generators/linesGenerator');
const circlesGenerator = require('../generators/circlesGenerator');
const _ = require('underscore');

/**
 * strengths and weaknesses graphics generator
 * @type {{generateBackground: module.exports.generateBackground}}
 */
module.exports = {
  generateBackground: (type, svg, coordinates) => {
    if (type === 'strengths') {
      _appendWordsToAxises(svg, _.toArray(strengthsWordsSet), 'strengths', coordinates);
    } else {
      _appendWordsToAxises(svg, _.toArray(weaknessesWordsSet), 'weaknesses', coordinates);
    }
    linesGenerator.generateLines(svg, coordinates, type);
    circlesGenerator.generateCircles(svg, coordinates, type);
  }
};

/**
 * calculate coordinates for each word
 * @param y
 * @param i
 * @param type
 * @returns {*}
 * @private
 */
_getYAxis = function(y, i, type) {
  if (i < 6 && i > 1 || i > 10 && i < 15) {
    y += type === 'weaknesses' ? 48 : 40;
  } else {
    if (i === 1) {
      y += 75;
    } else {
      if (i === 0 || i === 16) {
        y += 55;
      } else {
        y += 30;
      }
    }
  }
  if (i === 15) {
    y += 15;
  }
  if (i === 17) {
    y += 30;
  }
  return y;
};

/**
 * append words to graphic
 * @param svg
 * @param wordSet
 * @param type
 * @param coordinates
 * @private
 */
_appendWordsToAxises = function(svg, wordSet, type, coordinates) {
  const mappedCoordinates = mapper.mapCoordinates(type, coordinates);

  let y = 39;
  let x = 110;
  // const factorD = 1.8;
  // const factorI = 1.8;
  // const factorS = mappedCoordinates[2] <= 300 ? 1.8 : 1.7;
  // const factorC = 1.8;
  _.map( mappedCoordinates, (item, i) => {
    mappedCoordinates[i] = item * 1.8;
  });
  wordSet.map(value => {
    value.map( (val, j) => {
      const dy = mappedCoordinates[j];
      val.map( (word, i) => {
        const color = y > (dy - 55) && y < 425 || y < (dy - 32) && y > 425 ? '#5e166b' : '#afcee0';
        svg.append('g').append('text')
          .attr('y', 37 + y)
          .attr('x', x)
          .attr('font-size', '0.70em')
          .attr('font-weight', 'bold')
          .attr('text-align', 'center')
          .attr('text-anchor', 'middle')
          .attr('stroke-opacity', '1')
          .attr('stroke-width', '0')
          .attr('fill', color)
          .attr('font-family', 'Open Sans')
          .text(word);
        y = _getYAxis(y, i, type);
      });
      x += 113;
      y = 39;
    })
  })
};