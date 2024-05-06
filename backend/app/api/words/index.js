const { Router } = require('express')

const { Word } = require('../../models')
const { addWord, getWordsBelowSize, getListOfWordsById, isAccentuated } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Word.get())
    } catch (err){
        res.status(500).json(err)
    }
})


router.get('/wordsSize/:size', (req, res) => {
    try {
        const words = getWordsBelowSize(req.params.size);
        res.status(200).json(words)
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/listId/:listId', (req, res) => {
    try {
        const accentuated = req.query.accentuated === 'true';
        let words = getListOfWordsById(req.params.listId);
        if (!accentuated) {
            words = words.filter(word => !isAccentuated(word.text));
        }
        res.status(200).json(words)
    } catch (err){
        res.status(500).json(err)
    }
})

router.get('/accentuated/:listId', (req, res) => {
    try {
        const words = getListOfWordsById(req.params.listId);
        res.status(200).json(words)
    } catch (err){
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try{
        const word = addWord({...req.body})
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

router.delete('/', (req, res) => {
    try {
        Word.items = [];
        res.status(204).end()
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router