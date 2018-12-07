const d3 = require('d3');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var DOMParser = require('xmldom').DOMParser;


module.exports = {
  compositeGenerator: function (x, y) {
    const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    let body = d3.select(dom.window.document.querySelector('body'));
    const height = 600;
    const width = 240;
    let svg = body.append('svg')
      .attr("version", "1.1")
      .attr("xmlns", d3.namespaces.svg)
      .attr("xmlns:xlink", d3.namespaces.xlink)
      .attr("width", width)
      .attr("height", height);
    return new Promise(function(resolve, reject) {
      resolve(d3.svg('http://localhost:3003/assets/pdi_results_composite.svg'));
    });
    //return d3.svg('http://localhost:3003/assets/pdi_results_composite.svg');
    // background.then(data => {
    //   svg.html(data.documentElement.previousSibling);
    //   console.log(body.node().innerHTML);
    //   return body.node().innerHTML;
    // })

    // background.then(bg => {
    //     bg.documentElement.setAttribute('width', '240px');
    //     bg.documentElement.setAttribute('height', '600px');
    //     svg.html(bg.documentElement.outerHTML).style('width', 240).style('height', 600);
    //     return body.node().innerHTML;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
};