var express = require('express'),
  app = express(),
  fs = require('fs'),
  handlebars = require('handlebars'),
  async = require('async'),
  needle = require('needle'),
  metadata = require('./metadata.json'),
  portNumber = 8080;

app.use(express.static("./"));
var index = fs.readFileSync('index.hbs').toString();
var template = handlebars.compile(index);

/*
Campaign Page
*/
app.get('/campagnes/:slug', function(request, response, next) {
  needle.get('https://api.crowdaboutnow.nl/campaigns/' + request.params.slug, {rejectUnauthorized: false}, function(error, res, data) {
    if(error || !data) return next();
    var data = {
      'title': data.projectNaam,
      'description': data.introductieTekst,
      'imageUrl': data.coverURL,
      'pageUrl': request.protocol + '://' + request.headers.host + '/campagnes/' + data.id
    }
    var html = template(data);
    response.send(html);
  })
})

/*
Static Pages
*/
app.get('*', function(request, response) {
  var urlPath = request.url.replace(/\?.*?$/, '');
  var data = metadata.routes[urlPath];
  if(!data) return response.sendStatus(404);
  data.pageUrl = request.protocol + '://' + request.headers.host + urlPath;
  var html = template(data);
  response.send(html);
})

app.listen(portNumber, function() {
  console.info('Server started on port ' + portNumber);
});
