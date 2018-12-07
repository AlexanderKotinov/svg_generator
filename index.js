const express = require('express');
const app = express();
const request = require('request-promise');
const composite = require('./generators/composite');

const PORT = 3003;


app.get('/composite', (req, res) => {
  composite.compositeGenerator(req.query.x, req.query.y).then(data => {
    return res.status(200).send(data);
  }).catch(() => {
    return res.status(400);
  });
});

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(PORT, () => {
  if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch')
    global.DOMParser = require('xmldom').DOMParser;
  }
  console.log('Server ready!');
});