const { Router } = require('express')
const {ConfigModel} = require("../models");
const manageAllErrors = require("../utils/routes/manageAllErrors")

const router = new Router()

router.post('/', (req, res) => {
    try {
        const newConfig = ConfigModel.create({...req.body});
        console.log(newConfig)
        res.status(201).json(newConfig);
    }catch (err){
        manageAllErrors(res, err);
    }
})
router.get('/', (req, res) => {
    try {
        res.status(200).json(ConfigModel.get())
    }catch (err){
        manageAllErrors(res, err)
    }
})

router.put('/:id', (req, res) => {
    try{
        console.log(req.params.id)
        res.status(200).json(ConfigModel.update(req.params.id, req.body))
    }catch (err){
        manageAllErrors(res, err)
    }
})

router.delete('/:id', (req, res) => {
    try {
        ConfigModel.delete(req.params.id)
        res.status(204).end()
    } catch (err){
        manageAllErrors(res, err)
    }

})

module.exports = router;
