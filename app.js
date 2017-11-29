'use strict'

/* global util */

const SwaggerExpress = require('swagger-express-mw')
const app = require('express')()
const validator = require('swagger-express-validator')
const yaml = require('js-yaml')
const fs = require('fs')

const schema = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8'))

module.exports = app // for testing

const config = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)

  var port = process.env.PORT || 10010
  app.listen(port)

  const opts = {
    schema,
    validateRequest: true,
    validateResponse: true,
    requestValidationFn: (req, data, errors) => {
      console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
    },
    responseValidationFn: (req, data, errors) => {
      console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
    }
  }
  app.use(validator(opts))

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott')
  }
})
