var express = require('express'),
  app = express(),
  fs = require('fs'),
  handlebars = require('handlebars'),
  async = require('async'),
  needle = require('needle'),
  metadata = require('./metadata.json');

app.use(express.static(__dirname));
var index = fs.readFileSync('index.hbs').toString();
var template = handlebars.compile(index);

/*
Campaign Page
*/
app.get('/campagnes/:slug', (req, res, next) => {
  needle.get('https://api.crowdaboutnow.nl/campaigns/' + req.params.slug, {rejectUnauthorized: false}, function(error, response, data) {
    if(!data) return next();
    var data = {
      'title': data.projectNaam,
      'description': data.introductieTekst,
      'imageUrl': data.coverURL,
      'pageUrl': req.protocol + '://' + req.headers.host + '/campagnes/' + data.id
    }
    var html = template(data);
    res.send(html);
  })
})

/*
Static Pages
*/
app.get('*', (req, res) => {
  var data = metadata.routes[req.url];
  if(!data) return res.sendStatus(404);
  data.pageUrl = req.protocol + '://' + req.headers.host + req.url
  var html = template(data);
  res.send(html);
})

app.listen(8080);
