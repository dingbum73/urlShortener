const express = require('express')
const exphbs = require('express-handlebars')
const bodyParsr = require('body-parser')
const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
const port = 3000


// set template and engine
app.engine('hbs', exphbs.create({ defaultLayout: 'main', extname: 'hbs' }).engine)
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParsr.urlencoded({ extended: true }))

// setting routes
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`It's running on http://localhost:${port}`)

})

