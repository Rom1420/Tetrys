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

router.get('students/:idJoueur/parties/', (req, res) =>{
    try{
        const idJoueur = parseInt(req.params.idJoueur, 10)
        const studentHistory = GameResume.find(h => h.idJoueur === idJoueur)
        res.status(200).json(studentHistory)
    } catch (err) {
        manageAllErrors(res, err)
    }
})
router.get('students/:idJoueur/parties/:idPartie', (req, res) =>{
    try{
        const idJoueur = req.params.idJoueur
        const studentHistory = GameResume.find(h => h.idJoueur === idJoueur && h.idPartie === idPartie)
        res.status(200).json(studentHistory)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/students/:idJoueur/parties', (req, res) => {
    try {
        const idJoueur = parseInt(req.params.idJoueur, 10);
        const newGameResume = {
            idJoueur: idJoueur,
            ...req.body
        };
        const createdGameResume = GameResume.create(newGameResume);
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
