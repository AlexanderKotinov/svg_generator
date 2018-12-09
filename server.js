const express = require('express');
const app = express();
const request = require('request-promise');
const composite = require('./generators/composite');
const env = require('./.env');

const PORT = 3003;


app.get('/generate', (req, res) => {
  const data = composite.compositeGenerator(req.query.type, req.query.coords);
  return res.status(200).send(data);
});

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(PORT, () => {
  if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch');
    global.DOMParser = require('xmldom').DOMParser;
  }
  console.log('Server ready!');
});