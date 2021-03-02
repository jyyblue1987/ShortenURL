const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const urlShortener = require('./urlShortener');
const app = express();
const port = 3000;

let urlData = [];

function loadUrlData() {
  const urlDataFromFile = fs.readFileSync('data/urldata.json', 'utf8');
  const loadUrlDataFromFileCleaned = urlDataFromFile.replace(/^\ufeff/g, '');
  const urlDataParsed = JSON.parse(loadUrlDataFromFileCleaned);

  for(i = 0; i < urlDataParsed.length; i++)
  {
    var item = urlDataParsed[i];
    const shorten = new urlShortener(item['originalURL'], item['shortURL'], item['clickCount']);
    shorten.shortURL = item['shortURL'];
    shorten.clickCount = parseInt(item['clickCount']);

    urlData.push(shorten);
  }

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

  // find top 5 urls
  list = urlData.sort(function(a, b) {
    return b.clickCount - a.clickCount;
  });

  // var data = [];
  // for(i = 0; i < list.length; i++)
  // {
  //   var item = list[i];
  //   var row = {};
  //   row.originalURL = item.originalURL;
  //   row.shortURL = item.shortURL;
  //   row.clickCount = item.clickCount;

  //   data.push(row);
  // }
  
  const trendingPageBody = template({list: list});
  res.render('layout', {content: trendingPageBody});
});

app.use(express.static('public'));

app.listen(port, () => {
  const myUrlShortener = new urlShortener('http://www.bearconservation.org.uk/wp-content/uploads/2017/08/Kodiak_brown_bear_FWS_18383.jpg');
  console.log('shortened URL: ', myUrlShortener.shorten());
  console.log('expanded URL:', myUrlShortener.expand())
  
  
  console.log('Server started; type CTRL+C to shut down ')
  console.log(`Example app listening at http://localhost:${port}`)
});
