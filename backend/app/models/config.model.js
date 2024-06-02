const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Config', {
    name: Joi.string().required(),
    time: Joi.number().required(),
    length: Joi.number().required(),
    errorAllowed: Joi.boolean().required(),
    wordList: Joi.string(),
    userId: Joi.number(),
    listId: Joi.number().required()
})