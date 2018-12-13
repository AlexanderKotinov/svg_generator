const d3 = require('d3');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const CG = require('../generators/circlesGenerator');
const LG = require('../generators/linesGenerator');
const PGG = require('../generators/probableGraphicsGenerator');

/**
 * generate graphics
 * @type {{compositeGenerator: module.exports.compositeGenerator}}
 */
module.exports = {
  graphicsGenerator: function (type, coordinates) {
    /**
     * size properties for 'composite', 'most', 'least' graphics types
     */
    let cmlHeight = 600;
    let cmlWidth = 240;

    /**
     * probable graphic ('weaknesses', 'strengths') checking variable
     * @type {boolean}
     */
    let isProbableGraphic = false;

    /**
     * background for graphics
     */
    let backgroundUrl = null;

    /**
     * types of graphics
     */
    const graphicsTypes = ['composite', 'most', 'least', 'weaknesses', 'strengths'];

    if (type === 'weaknesses' || type === 'strengths') {
      isProbableGraphic = true
    }

    /**
     * check graphic type existing
     */
    if (graphicsTypes.includes(type)) {
      if (isProbableGraphic) {
        cmlHeight = 904;
        cmlWidth = 565;
      }

      backgroundUrl = `./assets/backgrounds/pdi_results_${ type }.svg`;
    } else {
      return false;
    }

    /**
     * prepare dom template
     * @type {JSDOM}
     */
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
      ${fs.readFileSync(backgroundUrl)}
    </body></html>`);

    /**
     * get appended svg from dom
     */
    let svg = d3.select(dom.window.document.querySelector('svg'));

    /**
     * add width & height for graphic
     */
    svg.attr('width', cmlWidth).attr('height', cmlHeight).style('width', cmlWidth).style('height', cmlHeight);

    if (isProbableGraphic) {
      PGG.generateBackground(type, svg, coordinates);
    } else {
      /**
       * generate graphics lines
       */

      LG.generateLines(svg, coordinates, type);

      /**
       * generate graphics circles
       */
      CG.generateCircles(svg, coordinates, type);
    }

    return svg.node().outerHTML;
  }
};