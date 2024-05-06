const { Router } = require('express')
const WordsRouter = require('./words')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/words', WordsRouter)

module.exports = router
