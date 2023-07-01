// 隨機產生5個英數字
function pickletters(letters) {
  const index = Math.floor(Math.random() * letters.length)
  return letters[index]
}

// 短網址
function urlShortener(originalUrl) {
  // characters N numbers
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let shortenerUrl = "http://localhost:3000/"

  // 如果不是使用者輸入的網址 不是http開頭就return
  if (!originalUrl.includes('http')) { return 'Please input URL' }

  // 隨機產生短網址
  for (let i = 1; i <= 5; i++) {
    shortenerUrl += pickletters(letters)
  }
  // return shortenerUrl 給使用者
  return shortenerUrl
}

// export  function for other files to use
module.exports = urlShortener
