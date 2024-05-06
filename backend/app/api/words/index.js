const { Router } = require('express')

const { Word } = require('../../models')
const { addWord } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Word.get())
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/:wordId', (req, res) => {
    try {
        const word = Word.getById(req.params.wordId);
        res.status(200).json(word)
    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try{
        console.log('addingWord')
        const word = addWord(req.body.text)
        res.status(201).json(word)
    } catch (err){
        if(err.name === 'ValidationError'){
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    } 
})

router.delete('/:wordId', (req, res) => {
    try {
        Word.delete(req.params.wordId)
        res.status(204).end()
    } catch (err) {
        res.status(500).json(err);
    }
  })

module.exports = router