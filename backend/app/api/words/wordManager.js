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


    static async createWord({ text, size, listId = 0, studentId = 0 }) {
        if (typeof text !== 'string' || text.trim() === '') {
            console.error('Invalid word text');
            return null;
        }
        if (this.isInWordsList(text, listId)) {
            return null; 
        }

        size = text.length;
        try {
            const newWord = Word.create({ text: text, size: size, listId: listId, studentId: studentId });
            return newWord;
        } catch (err) {
            console.error('Error creating word in manager:', err);
            throw err;
        }
    }

    static async createWords(words) {
        const createdWords = [];
        for (const wordData of words) {
            const { text, listId = 0, studentId = 0 } = wordData;
            const size = text.length;
            try {
                const newWord = await this.createWord({ text, size, listId, studentId });
                createdWords.push(newWord);
            } catch (err) {
                console.error(`Error creating word: ${text}`, err);
                throw err;
            }
        }
        return createdWords;
    }

    static isInWordsList(wordText, listId) {
        const words = this.getAllWords();
        return words.some(word => word.text === wordText && word.listId === listId);
    }

    static isAccentuated(word) {
        const accentuatedCharacters = /[àâäéèêëîïôöùûü']/gi;
        return accentuatedCharacters.test(word);
    }

    static getListOfWordsById(listId){
        return Word.get().filter(word => word.listId == listId);
    }

    static deleteWordsByListId(listId) {
        try {
            listId = parseInt(listId, 10);
            Word.items = Word.items.filter(word => word.listId !== listId);
        } catch (err) {
            console.error('Error deleting words by listId:', err);
            throw err;
        }
    }
}

module.exports = WordManager;