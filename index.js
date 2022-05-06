const mongoose = require('mongoose')
const express = require('express');
const ShortUrl = require('./models/shortUrl')
var app = express();

mongoose.connect('mongodb://localhost/urlShortner',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine','ejs') 
app.use(express.urlencoded({ extended: false }))


app.get('/', async function(req, res) {
  res.render('index')
});

app.get('/display', async function(req,res){
  const shortUrls = await ShortUrl.find()
  res.render('urldisplay', { shortUrls: shortUrls })
})

// post route to submit a url https://google.com
//  and the response should be the shortened url.
// http://localhost:3000/dskghj
app.post('/', async function (req,res){
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/display')
})

// get route to redirect the original url.
app.get('/:shortUrl', async function (req,res){
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

  res.redirect(shortUrl.full)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
