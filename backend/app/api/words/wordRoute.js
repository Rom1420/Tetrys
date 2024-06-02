const { Router } = require('express')

const { Word } = require('../../models')
const { addWord, getWordsBelowSize, getListOfWordsById, isAccentuated, isInWordsList } = require('./manager')
const WordManager = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
    try {
        const accentuated = req.query.accentuated === 'true';
        let words = Word.get();
        if (!accentuated) {
            words = words.filter(word => !isAccentuated(word.text));
        }
        res.status(200).json(words)
    } catch (err){
        console.log(err)
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

router.post('/', async (req, res) => {
    try {
        if (WordManager.isInWordsList(req.body.text, req.body.listId)) {
            return res.status(400).json({ error: 'Word already exists' });
        }
        
        const newWord = await WordManager.createWord(req.body);
        res.status(201).json(newWord);
    } catch (err) {
        console.error('Error adding word:', err);
        res.status(500).json({ error: err.message });
    }
});


router.put('/:wordId', (req, res) => {
    try {
      res.status(200).json(Word.update(req.params.wordId, req.body))
    } catch (err) {
        res.status(500).json(err);
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