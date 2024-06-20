const { Router } = require('express')

const { GameDetails } = require('../../models')
const { createDetailsForStudent } = require('./manager')
const manageAllErrors = require('../../utils/routes/error-management')
const { getGameDetailsOfPlayer } = require('./manager')

const router = new Router()

router.get('/',(req,res)=>{
    try{
        const gameDetails = GameDetails.get()
        res.status(200).json(gameDetails)
    } catch (err){
        manageAllErrors(res, err)
    }
})

router.get('/students/:idJoueur', (req, res) =>{
    try{
        const gameDetails = getGameDetailsOfPlayer(req.params.idJoueur);
        res.status(200).json(gameDetails)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/students/:idJoueur/parties/:idPartie', (req, res) =>{
    try{
        const idJoueur = parseInt(req.params.idJoueur, 10)
        const idPartie = parseInt(req.params.idPartie, 10)
        const gameDetails = GameDetails.get().find(gameDetails => gameDetails.idJoueur === idJoueur && gameDetails.idPartie === idPartie)
        res.status(200).json(gameDetails)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/students/:idJoueur', (req, res) => {
    try {
        const idJoueur = parseInt(req.params.idJoueur, 10);
        const newGameDetails = {
            idJoueur: idJoueur,
            ...req.body
        };
        console.log("avant create",newGameDetails)
        const createdGameDetails = createDetailsForStudent(newGameDetails,newGameDetails.idJoueur);
        console.log("apres create",newGameDetails)
        res.status(201).json(createdGameDetails);
    } catch (err) {
        manageAllErrors(res, err);
    }
});

router.put('/:gamedetailsId', (req,res) => {
    try {
        res.status(200).json(GameDetails.update(req.params.gamedetailsId, req.body))
    } catch(err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:gamedetailsId', (req,res) => {
    try {
        GameResume.delete(req.params.gamedetailsId)
        res.status(204).end()
    } catch(err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
