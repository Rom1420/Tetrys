const { Router } = require('express')
const StudentRouter = require('./students')
const StatsRouter = require('./stats')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/students', StudentRouter)
router.use('/stats', StatsRouter)

module.exports = router
