const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParsr = require('body-parser')
const urlShortener = require('./utility/shortener')
const Urls = require('./models/urls')


const app = express()
const port = 3000

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// DB connect
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection

// DB連線異常
db.on('error', () => { console.log('DB error') })

// DB成功連線
db.once('open', () => { console.log('DB connected!') })


// set template and engine
app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: 'hbs' }).engine)
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParsr.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl.trim(" ")
  const shortlUrl = urlShortener(inputUrl)
  // 如果不是使用者輸入的網址 不是http開頭就return
  if (inputUrl.substr(0, 4) !== 'http') {
    res.render('index', { inputUrl })
    return
  }
  Urls.create({
    originalUrl: inputUrl,
    shortenerUrl: shortlUrl
  }).then(() => {
    res.render('show', { shortlUrl })
  }).catch(error => { console.log(error) })
})

app.get('/:shortlUrl', (req, res) => {
  const shortlUrl = req.params.shortlUrl
  return Urls.find({ shortenerUrl: shortlUrl })
    .lean()
    .then((url) => { res.redirect(url[0].originalUrl) })
    .catch(error => { console.log(error) })
})


// Start and listen the server
app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)

})





