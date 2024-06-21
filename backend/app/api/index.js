const { Router } = require('express')
const manageAllErrors = require("../utils/routes/manageAllErrors")
const Config = require("./configModel")
const Difficulties = require('./difficultyModel')
const Words = require('./words/wordRoute')
const StudentRouter = require('./students')
const StatsRouter = require('./stats')
const GameResumeRouter = require('./gameResumes')
const GameDetailsRouter = require('./gameDetails')

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
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/students', StudentRouter)
router.use('/stats', StatsRouter)
router.use('/gameResumes', GameResumeRouter)
router.use('/gameDetails',GameDetailsRouter)

module.exports = router
