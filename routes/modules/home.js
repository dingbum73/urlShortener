const express = require('express')
const router = express.Router()
const urlShortener = require('../../utility/shortener')
const Urls = require('../../models/urls')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const inputUrl = req.body.inputUrl.trim()
  const shortlUrl = urlShortener(inputUrl)
  // 如果不是使用者輸入的網址 不是http開頭就return
  // 如果已經是產出的短網址也return
  if (!inputUrl.startsWith('http') || inputUrl.includes('localhost:3000')) {
    return res.render('index', { inputUrl })

  }

  Urls.findOne({ originalUrl: inputUrl })
    .lean()
    .then((url) => {
      if (url) {
        res.render('show', { shortlUrl: url.shortenerUrl }) // 先查看是否有相同網址
      } else {
        Urls.create({
          originalUrl: inputUrl,
          shortenerUrl: shortlUrl
        }).then(() => {
          res.render('show', { shortlUrl })
        })
      }
    })
    .catch(error => { console.log(error) })
})


router.get('/:shortlUrl', (req, res) => {
  const shortlUrl = req.params.shortlUrl
  if (shortlUrl) {
    return Urls.findOne({ shortenerUrl: shortlUrl })
      .lean()
      .then((url) => { res.redirect(url.originalUrl) })
      .catch(error => { console.log(error) })
  }
})


// 匯出路由模組
module.exports = router