const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Stats', {
    idJoueur: Joi.number().required(),
    mode: Joi.string().required(),
    wpm: Joi.number(),
    scoreMoyen: Joi.number(),
    pourcentageErreur: Joi.number()
})





