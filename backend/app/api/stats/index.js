const { Router } = require('express')

const { Stats } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Stats.get)
    }
    catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:statsId', (req, res) => {
    try {
        res.status(200).json(Stats.getById(req.params.statsId))
    }
    catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const stats = Stats.create(req.body)
        res.status(201).json(stats)
    }
    catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:statsId', (req, res) => {
    try{
        res.status(200).json(Stats.update(req.params.statsId, req.body))
    }
    catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:statsId', (req, res) => {
    try{
        Stats.delete(req.params.statsId)
        res.status(204).end()
    }
    catch (err) {
        manageAllErrors(res, err)
    }
})


module.exports = router