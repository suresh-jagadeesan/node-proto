const yaml = require('js-yaml')
const expressAjv = require('express-ajv');
const fs = require('fs')
const Ajv = require('ajv')

// Load and validate schema
const ajv = new Ajv();
const schema = yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8'))
console.log(schema.definitions.ProductResponse.properties)
const validate = ajv.compile(schema)


// const schema = expressAjv.schema
// schema.addSchema('product', yaml.safeLoad(fs.readFileSync('./api/swagger/swagger.yaml', 'utf8')))

function _validate(req, res, next) {
  const valid = validate(req.body)
  console.log('validating req.body: ', req.body)
  console.log('isValid? ', valid)
    if (!valid) {
      console.log(validate.errors)
      return next(validate.errors)
    }
    console.log('passed validation')
    return next()
}

//to prevent raise condition in your routes use this module 
// module.exports = expressAjv.validatorFactory;
module.exports.validate = _validate