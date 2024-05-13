const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Config', {
    name: Joi.string().required(),
    time: Joi.string().required(),
    length: Joi.string().required(),
    errorAllowed: Joi.boolean().required(),
})