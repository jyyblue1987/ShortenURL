const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const urlShortener = require('./urlShortener');
const app = express();
const port = 3000;

let urlData;

function loadUrlData() {
  const urlDataFromFile = fs.readFileSync('data/urldata.json', 'utf8');
  const loadUrlDataFromFileCleaned = urlDataFromFile.replace(/^\ufeff/g, '');
  const urlDataParsed = JSON.parse(loadUrlDataFromFileCleaned);
  urlData = urlDataParsed;
  console.log('URL data: ', urlData);
}

loadUrlData();

app.use(bodyParser.urlencoded());

app.use(function debugMiddleware(req, res, next) {
  console.log('Method: ' + req.method);
  console.log('Path: ' + req.originalUrl);
  console.log('Query String: ' + JSON.stringify(req.query));
  next();
});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  const trendingTemplate = fs.readFileSync('views/trending.hbs', {encoding: 'utf8'});
  const template = hbs.compile(trendingTemplate);
  const trendingPageBody = template({});
  res.render('layout', {content: trendingPageBody});
});

app.use(express.static('public'));

app.listen(port, () => {
  const myUrlShortener = new urlShortener('http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg');
  console.log('shortened URL: ', myUrlShortener.shorten());
  
  
  console.log('Server started; type CTRL+C to shut down ')
  console.log(`Example app listening at http://localhost:${port}`)
});
