var express = require('express'),
  app = express(),
  fs = require('fs'),
  handlebars = require('handlebars'),
  async = require('async'),
  request = require('request-json'),
  client = request.createClient('https://crowdaboutnow.nl/'),
  metadata = require('./metadata.json');

app.use(express.static(__dirname));
var index = fs.readFileSync('index.hbs').toString();
var template = handlebars.compile(index);


/*
Campaign Page
*/
app.get('/campagnes/:slug', (req, res) => {
  console.log('req', req.params.slug)
  client.get('api/campaigns/' + req.params.slug, function(error, response, data) {
    if(!data) return res.sendStatus(404);
    var data = {
      "title": data.projectNaam,
      "description": data.introductieTekst,
      "imageUrl": data.coverURL,
      "pageUrl": "https://placetobe.nl/campagnes/" + data.id
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
  data.pageUrl = "https://placetobe.nl" + req.url
  var html = template(data);
  res.send(html);
})

app.listen(8080);
