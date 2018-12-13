const mapper = require('../mappers/coordinatesMapper');

module.exports = {
  generateLines: function (svg, coordinates, type) {

     /**
     * append big circle to graphic
     */
    const mappedCoordinates = mapper.mapCoordinates(type, coordinates);

    if (type === 'weaknesses' || type === 'strengths') {
      svg = _strengthsWeaknessesLinesGenerator(svg, mappedCoordinates);
    } else {
      svg = _mostLeastCompositeLinesGenerator(svg, mappedCoordinates);
    }

    return svg;
  }
};

/**
 * generate lines for most, least, composite graphics
 * @param svg
 * @param mappedCoordinates
 * @private
 */
_mostLeastCompositeLinesGenerator = function (svg, mappedCoordinates) {
  /**
   * top padding
   * @type {number}
   */
  const paddingTop = 30;

  /**
   * padding left (cx)
   * @type {number}
   */
  let cxAxis = 68;

  /**
   * padding left for cx axis
   * @type {number}
   */
  const paddingLeft = 43;

  mappedCoordinates.map( (value, i) => {
    if (i < 3) {
      svg.append('g').append('line')
        .attr('x1', cxAxis)
        .attr('y1', value + paddingTop)
        .attr('x2', cxAxis + paddingLeft)
        .attr('y2', mappedCoordinates[i + 1] ? mappedCoordinates[i + 1] + paddingTop : null)
        .attr('stroke-width', 4)
        .attr('stroke', '#e58a29');

      cxAxis += paddingLeft;
    }

    return svg;
  });
};

_strengthsWeaknessesLinesGenerator = function (svg, mappedCoordinates) {
  const weaknessPadding = 5;
  const factorD = 1.8;
  const factorI = 1.8;
  const factorS = mappedCoordinates[2] <= 300 ? 1.8 : 1.7;
  const factorC = 1.8;
  let y = null;
  const data = [
    { x: 110, y: mappedCoordinates[0] * factorD },
    { x: 226, y: mappedCoordinates[1] * factorI },
    { x: 340, y: mappedCoordinates[2] * factorS },
    { x: 453, y: mappedCoordinates[3] * factorC }];

  data.map((d, i) => {
    if (data[i + 1]) {
      svg.append('g').append('line')
        .attr('x1', d.x)
        .attr('y1', d.y - weaknessPadding >= weaknessPadding ? d.y - weaknessPadding : weaknessPadding + 5)
        .attr('x2', data[i + 1].x ? data[i + 1].x : null)
        .attr('y2', data[i + 1].y - weaknessPadding >= weaknessPadding ? data[i + 1].y - weaknessPadding : weaknessPadding + 5)
        .attr('stroke-width', 4)
        .attr('stroke', '#b7e9ff');
    }
  });

  return svg;
};