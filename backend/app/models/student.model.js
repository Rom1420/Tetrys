const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Student', {
    id: Joi.number().required(),
    name: Joi.string().required(),
    isSelected: Joi.boolean().required()
})