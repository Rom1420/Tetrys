const { Router } = require('express')
const manageAllErrors = require("../utils/routes/manageAllErrors")
const Config = require("./configModel")
const Difficulties = require('./difficultyModel')
const Words = require('./words/wordRoute')

const router = new Router()
router.get('/status', (req, res) => {
    try {
        res.status(200).json('ok')
    } catch (err){
        manageAllErrors(res, err)
    }
});

router.use('/configs', Config);
router.use('/difficulties', Difficulties)
router.use('/words', Words)

module.exports = router
