const { Router } = require('express')

const { Word } = require('../../models')
const { getWordsBelowSize, getListOfWordsById, isAccentuated } = require('./wordManager')
const WordManager = require('./wordManager')

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

router.post('/wordsList', (req, res) => {
    try {
        const words = req.body;
        const createdWords = WordManager.createWords(words);
        res.status(201).json(createdWords);
    } catch (err) {
        console.error('Error adding words:', err);
        manageAllErrors(res, err);
    }
});


router.put('/:wordId', (req, res) => {
    try {
      res.status(200).json(Word.update(req.params.wordId, req.body))
    } catch (err) {
        res.status(500).json(err);
    }
  })

router.delete('/listId/:listId', (req, res) => {
    const listId = req.params.listId;
    try {
        WordManager.deleteWordsByListId(listId);
        res.status(200).json({ message: `All words with listId ${listId} have been deleted.` });
    } catch (err) {
        console.error('Error deleting words:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/', (req, res) => {
    try {
        Word.items = [];
        res.status(204).end()
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router