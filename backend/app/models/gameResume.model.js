const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('GameResume',{
    idJoueur: Joi.number().required(),
    idPartie : Joi.number().required(),
    gameMode : Joi.string().required(),
    gameScore : Joi.number().required(),
    gameStars : Joi.number().required(),
    date : Joi.string().required(),
})