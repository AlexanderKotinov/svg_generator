const d3 = require('d3');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
var DOMParser = require('xmldom').DOMParser;


module.exports = {
  compositeGenerator: function (type, coords) {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
${fs.readFileSync('./assets/pdi_results_composite.svg', 'utf-8')}
</body></html>`);
    const height = 600;
    const width = 240;

    switch(type) {
      case 'composite':

    }

    let svg = d3.select(dom.window.document.querySelector('svg'));
    // let svg = body.append('svg')
    //   .attr("version", "1.1")
    //   .attr("xmlns", d3.namespaces.svg)
    //   .attr("xmlns:xlink", d3.namespaces.xlink)
    //   .attr("width", width)
    //   .attr("height", height);

    // body.html(fs.readFileSync('./assets/pdi_results_composite.svg', 'utf-8'));

    // let svg =
    // let svg = body.node().getElementsByTagName('svg')[0];
    //
      svg.attr('width', width)
      .attr('height', height)
      .style('width', width)
      .style('height', height).append('g').append('circle')
      .attr('cx', 200)
      .attr('cy', 500)
      .attr('r', 20)
      .attr('fill', 'orange');

    // let body = d3.select(dom.window.document.querySelector('body'));
    // body.node().innerHTML = '';
    // body.append(svg.node());
    return svg.node().outerHTML;
    // return new Promise(function(resolve, reject) {
    //   resolve(d3.svg('http://localhost:3003/assets/pdi_results_composite.svg'));
    // });
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