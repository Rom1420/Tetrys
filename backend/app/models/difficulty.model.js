const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const {ConfigModel} = require("./index");

module.exports = new BaseModel('Difficulty', {
    difficultyId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    config: {
        name: Joi.string().required(),
        time: Joi.number().required(),
        length: Joi.number().required(),
        errorAllowed: Joi.boolean().required(),
        wordList: Joi.string(),
        userId: Joi.number(),
    }
})