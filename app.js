const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const urlShortener = require('./utility/shortener')

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


app.get('/', (req, res) => {
  res.render('index')
})

// app.post('/',())

// Start and listen the server
app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)
})