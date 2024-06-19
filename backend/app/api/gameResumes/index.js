const { Router } = require('express')

const { GameResume } = require('../../models')
const { createResumeForStudent } = require('./manager')
const manageAllErrors = require('../../utils/routes/error-management')
const { getGameResumeOfPlayer } = require('./manager')

const router = new Router()

router.get('/',(req,res)=>{
    try{
        const gameresumes = GameResume.get()
        res.status(200).json(gameresumes)
    } catch (err){
        manageAllErrors(res, err)
    }
})

router.get('/students/:idJoueur', (req, res) =>{
    try{
        const gameresumes = getGameResumeOfPlayer(req.params.idJoueur);
        res.status(200).json(gameresumes)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/students/:idJoueur/parties/:idPartie', (req, res) =>{
    try{
        const idJoueur = parseInt(req.params.idJoueur, 10)
        const idPartie = parseInt(req.params.idPartie, 10)
        const studentHistory = GameResume.get().find(gameResume => gameResume.idJoueur === idJoueur && gameResume.idPartie === idPartie)
        res.status(200).json(studentHistory)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/students/:idJoueur', (req, res) => {
    try {
        const idJoueur = parseInt(req.params.idJoueur, 10);
        const newGameResume = {
            idJoueur: idJoueur,
            ...req.body
        };
        console.log("avant create",newGameResume)
        const createdGameResume = createResumeForStudent(newGameResume,newGameResume.idJoueur);
        console.log("apres create",newGameResume)
        res.status(201).json(createdGameResume);
    } catch (err) {
        manageAllErrors(res, err);
    }
});

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
