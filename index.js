const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'))
global.Promise = mongoose.Promise = require('bluebird')

const { port, dbURI } = require('./config/environment')
const router = require('./config/routes')

mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(bodyParser.json())
app.use(router)

app.listen(port, () => console.log('Free cyclin\''))
