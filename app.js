const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  const trendingTemplate = fs.readFileSync('views/trending.hbs', {encoding: 'utf8'});
  const template = hbs.compile(trendingTemplate);
  const trendingPageBody = template({});
  res.render('layout', {content: trendingPageBody});
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server started; type CTRL+C to shut down ')
  console.log(`Example app listening at http://localhost:${port}`)
});
