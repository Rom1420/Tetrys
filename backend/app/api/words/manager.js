const { Word } = require('../../models')

class WordManager {
    static getAllWords() {
        return Word.get();
    }

    static getWordsBelowSize(maxSize) {
        return Word.get().filter(word => word.size < maxSize);
    }

    static getWordsById(wordId){
        return Word.get().filter(word => word.id == wordId);
    }

    static createWord(word) {
        return Word.create(word);
    }

    static addWord(text) {
        if(typeof text !== 'string' || text.trim() === '') {
        }
        const size = text.length
        console.log('addingWord')
        try {
            return Word.create({text:text, size:size})
        } catch (err){
        
        }
    }
}

module.exports = WordManager;