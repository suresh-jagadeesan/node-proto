'use strict'

/* global util */

const app = require('express')()
const yaml = require('js-yaml')
const fs = require('fs')
const bodyParser = require('body-parser')
const Product = require('./api/controllers/product')

const schema = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8'))

module.exports = app // for testing

const config = {
  appRoot: __dirname // required config
}

// parse application/json
app.use(bodyParser.json())

app.get('/product/:id', (req, res, next) => {
  res.json({ test: 'file stuff' })
})

app.get('/products', (req, res, next) => {
  return Product.getAll()
    .then(data => res.json(data))
    .catch(next)
})

app.post('/product', (req, res, next) => {
  return Product.create(req.body)
    .then(data => res.json(data))
    .catch(next)
})

var port = process.env.PORT || 10010
app.listen(port, () => {
  console.log('Try accessing /products')
})
