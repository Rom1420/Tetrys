const { Word } = require('../../models')

class WordManager {
    static getAllWords() {
        return Word.get();
    }

    /**
     * Récupère les mots dont la taille est inférieure ou égale à la taille maximale spécifiée.
     * @param {number} maxSize La taille maximale des mots à récupérer.
     * @returns {Array} Un tableau contenant les mots dont la taille est inférieure ou égale à maxSize.
     */
    static getWordsBelowSize(maxSize) {
        return Word.get().filter(word => word.size <= maxSize);
    }

    static getWordsById(wordId){
        return Word.get().filter(word => word.id == wordId);
    }

    static createWord(word) {
        return Word.create(word);
    }

    static addWord({text, size, listId = 0, studentId = 0}) {
        if(typeof text !== 'string' || text.trim() === '') {
        }
        size = text.length
        try {
            return Word.create({text:text, size:size, listId:listId, studentId:studentId});
        } catch (err){
        
        }
    }

    static isAccentuated(word) {
        const accentuatedCharacters = /[àâäéèêëîïôöùûü']/gi;
        return accentuatedCharacters.test(word);
    }

    static getListOfWordsById(listId){
        return Word.get().filter(word => word.listId == listId);
    }
}

module.exports = WordManager;