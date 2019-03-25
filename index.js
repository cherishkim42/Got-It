// init
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()

// bye-bye deprecation warnings
mongoose.set('useFindAndModify', false) // https://github.com/Automattic/mongoose/issues/6880

// middleware
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost/got-it"
mongoose.connect(mongoUri, { useNewUrlParser: true } )

// controllers
const entries = require('./controllers/entries')(app)
const comments = require('./controllers/comments')(app)

const PORT = process.env.PORT || 3000

// web server check
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
});

// module.exports = app;
