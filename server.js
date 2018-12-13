const express = require('express');
const app = express();
const request = require('request-promise');
const generator = require('./generators/graphicsGenerator');
const env = require('./.env');

const PORT = 53216;

app.get('/', (req, res) => {
  return res.send('PDI svg generator');
});

app.get('/generate', (req, res) => {
  const data = generator.graphicsGenerator(req.query.type, req.query.coordinates);

  if (data) {
    return res.status(200).send(data);
  } else {
    return res.status(400).send('Graphics data incorrect!');
  }
});

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(PORT, () => {
  if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch');
    global.DOMParser = require('xmldom').DOMParser;
  }
  console.log('Server ready!');
});