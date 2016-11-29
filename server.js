var express = require('express'),
  app = express(),
  fs = require('fs'),
  handlebars = require('handlebars'),
  async = require('async'),
  metadata = require('./metadata.json');

app.use(express.static(__dirname + '/build/bundled/'));
var index = fs.readFileSync('index.hbs').toString();
var template = handlebars.compile(index);

app.get('*', (req, res) => {

  var data = metadata.routes[req.url];
  if(!data) return res.sendStatus(404);
  var html = template(data);
  res.send(html);    

})

app.listen(8001);