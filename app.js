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
  const inputUrl = req.body.inputUrl.trim()
  const shortlUrl = urlShortener(inputUrl)
  console.log(inputUrl)
  // 如果不是使用者輸入的網址 不是http開頭就return
  // 如果已經是產出的短網址也return
  if (!inputUrl.startsWith('http') || inputUrl.includes('localhost:3000')) {
    return res.render('index', { inputUrl })
  } else if (Urls.findOne({ originalUrl: inputUrl }).length !== 0) {
    // 先查看是否有相同網址
    Urls.findOne({ originalUrl: inputUrl })
      .lean()
      .then((url) => { res.render('show', { shortlUrl: url.shortenerUrl }) })
      .catch(error => { console.log(error) })
  } else {
    Urls.create({
      originalUrl: inputUrl,
      shortenerUrl: shortlUrl
    }).then(() => {
      res.render('show', { shortlUrl })
    }).catch(error => { console.log(error) })
  }
})

// 用短網址搜尋，並使用重新導向原本網址
app.get('/:shortlUrl', (req, res) => {
  const shortlUrl = req.params.shortlUrl
  return Urls.findOne({ shortenerUrl: shortlUrl })
    .lean()
    .then((url) => { res.redirect(url.originalUrl) })
    .catch(error => { console.log(error) })
})


// Start and listen the server
app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)

})





