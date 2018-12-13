const mapper = require('../mappers/coordinatesMapper');
/**
 *
 * @type {{circlesGenerator: (function(*, *=, *=): *)}}
 */
module.exports = {
  /**
   *
   * @param svg
   * @param coordinates
   * @param type
   * @returns {*}
   */
  generateCircles: function (svg, coordinates, type) {
    /**
     * append big circle to graphic
     */
    const mappedCoordinates = mapper.mapCoordinates(type, coordinates);

    let svgImg = null;

    if (type === 'weaknesses' || type === 'strengths') {
      svgImg = _strengthsWeaknessesCirclesGenerator(svg, mappedCoordinates);
    } else {
      svgImg  = _mostLeastCompositeCirclesGenerator(svg, mappedCoordinates);
    }

    return svgImg ;
  }
};

_mostLeastCompositeCirclesGenerator = function (svg, mappedCoordinates) {
  /**
   * circles radius for 'composite', 'most', 'least' graphics types in px
   */
  const cmlBigRadius = 9;
  const cmlSmallRadius = 6;

  /**
   * top padding
   * @type {number}
   */
  const padding = 29;

  /**
   * padding left (cx)
   * @type {number}
   */
  let cxAxis = 68;

  mappedCoordinates.map( value => {
    /**
     * append big circle to graphic
     */
    svg .append('g')
      .append('circle')
      .attr('cx', cxAxis)
      .attr('cy', padding + value)
      .attr('r', cmlBigRadius)
      .attr('fill', '#e58a29');

    /**
     * append small circle to graphic
     */
    svg .append('g')
      .append('circle')
      .attr('cx', cxAxis)
      .attr('cy', padding + value)
      .attr('r', cmlSmallRadius)
      .attr('fill', '#e9ba30');

    cxAxis += 43;
  });

  return svg;
};

_strengthsWeaknessesCirclesGenerator = function (svg, mappedCoordinates) {
  const weaknessPadding = 5;
  const factorD = 1.8;
  const factorI = 1.8;
  const factorS = mappedCoordinates[2] <= 300 ? 1.8 : 1.7;
  const factorC = 1.8;
  const data = [
    { x: 110, y: mappedCoordinates[0] * factorD },
    { x: 226, y: mappedCoordinates[1] * factorI },
    { x: 340, y: mappedCoordinates[2] * factorS },
    { x: 453, y: mappedCoordinates[3] * factorC }];
  data.map((d) => {
    svg.append('circle')
      .attr('cx', d.x ? d.x : null)
      .attr('cy', d.y - weaknessPadding >= weaknessPadding ? d.y - weaknessPadding : weaknessPadding + 3)
      .attr('r', 9)
      .style('fill', '#b7e9ff');
    svg.append('circle')
      .attr('cx', d.x ? d.x : null)
      .attr('cy', d.y - weaknessPadding >= weaknessPadding ? d.y - weaknessPadding : weaknessPadding + 3)
      .attr('r', 6)
      .style('fill', '#e9ba30');
  });
  return svg;
};