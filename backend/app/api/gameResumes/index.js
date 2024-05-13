const { Router } = require('express')

const { GameResume } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/',(req,res)=>{
    try{
        const gameresumes = GameResume.get()
        res.status(200).json(gameresumes)
    } catch (err){
        manageAllErrors(res, err)
    }
})

router.get('/:gameresumeId', (req, res) =>{
    try{
        const gameresume = GameResume.getById(req.params.gameresumeId)
        res.status(200).json(gameresume)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/',(req,res)=>{
    try {
        const gameResume = GameResume.create({...req.body})
        res.status(201).json(gameresume)
    } catch (err) {
        manageAllErrors(res,err)
    }
})

router.put('/:gameresumeId', (req,res) => {
    try {
        res.status(200).json(GameResume.update(req.params.gameresumeId, req.body))
    } catch(err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:gameresumeId', (req,res) => {
    try {
        GameResume.delete(req.params.gameresumeId)
        res.status(204).end()
    } catch(err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
