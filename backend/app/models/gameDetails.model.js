const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('GameDetails',{
    idJoueur: Joi.number().required(),
    idPartie : Joi.number().required(),
    precisionPercentage : Joi.number().required(),
    wordsPerMinute : Joi.number().required(),
    incorrectWordsNumber : Joi.number().required(),
    correctWordsNumber : Joi.number().required(),
    accentsPrecisionPercentage: Joi.number().required(),
})