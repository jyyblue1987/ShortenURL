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
  console.log('Query String: ' + JSON.stringify(req.body));
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
  
  const trendingPageBody = template({list: list});
  res.render('layout', {content: trendingPageBody});
});


app.get('/shorten', (req, res) => {
  const trendingTemplate = fs.readFileSync('views/shorten.hbs', {encoding: 'utf8'});
  const template = hbs.compile(trendingTemplate);

  const trendingPageBody = template({});
  res.render('layout', {content: trendingPageBody});
});


app.get('/expand', (req, res) => {
  const trendingTemplate = fs.readFileSync('views/expand.hbs', {encoding: 'utf8'});
  const template = hbs.compile(trendingTemplate);

  const trendingPageBody = template({});
  res.render('layout', {content: trendingPageBody});
});



app.post('/shorten', (req, res) => {
  var url = req.body.url;

  var myUrlShortener = undefined;
  urlData.forEach(function(item) {
    if( item.originalURL == url )
      myUrlShortener = item;
  });
  
  if( !myUrlShortener )
  {
    myUrlShortener = new urlShortener(url);
    myUrlShortener.shorten();
  }

  var shorten_url = 'Invalid URL';
  try {
    var shorten_url = myUrlShortener.shortURL;
    urlData.push(myUrlShortener);
  } catch(e) {

  }

  var data = {'shorten_url' : shorten_url};
  res.send(data);
});

app.post('/expand', (req, res) => {
  var url = req.body.url;

  var myUrlShortener = undefined;
  urlData.forEach(function(item) {
    if( item.shortURL == url )
      myUrlShortener = item;
  });
  
  var expand_url = 'Invalid URL';
  if( myUrlShortener )
  {
    expand_url = myUrlShortener.originalURL;
    myUrlShortener.updateClickCount();
  }
  
  var data = {'expand_url' : expand_url};
  res.send(data);
});



app.use(express.static('public'));

app.listen(port, () => {

  
  
  console.log('Server started; type CTRL+C to shut down ')
  console.log(`Example app listening at http://localhost:${port}`)
});
