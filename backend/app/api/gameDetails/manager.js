const { GameDetails } = require('../../models')

class GameResumeManager {
    static getAllGameDetails(){
        return GameDetails.get();
    }

    static getGameDetailsOfPlayer(idJoueur){
        return GameDetails.get().filter(gamedetails => gamedetails.idJoueur == idJoueur);
    }
    static getGameDetailsById(gamedetailsId){
        return GameDetails.get().filter(gamedetails => gamedetails.id == gamedetailsId);
    }
    static async createGameDetail({idJoueur,idPartie,precisionPercentage,wordsPerMinute,incorrectwordsNumber,correctWordsNumber,accentsPrecisionPercentage}){
        try {
            const newGameDetails = GameDetails.create({idJoueur: idJoueur,idPartie: getNextIdPartieForStudent(idJoueur),precisionPercentage: precisionPercentage,wordsPerMinute: wordsPerMinute,incorrectwordsNumber: incorrectwordsNumber,correctWordsNumber: correctWordsNumber,accentsPrecisionPercentage: accentsPrecisionPercentage});
            return newGameDetails;
        } catch (err) {
            console.error('Error creating gameDetails in manager:', err);
            throw err;
        }
    }
    static async createGameDetails(gameDetails){
        const createdGameDetails = [];
        for(const gameDetailsData of gameDetails){
            const {idJoueur,idPartie,precisionPercentage,wordsPerMinute,incorrectwordsNumber,correctWordsNumber,accentsPrecisionPercentage}=gameDetailsData;
            try{
                const newGameDetail = await this.createGameResume({idJoueur,idPartie,precisionPercentage,wordsPerMinute,incorrectwordsNumber,correctWordsNumber,accentsPrecisionPercentage});
                createdGameDetails.push(newGameDetail);
            } catch (err) {
                console.error(`Error creating gameDetails: ${text}`, err);
                throw err;
            }
        }
        return createdGameResumes;
    }
    static getNextIdPartieForStudent(studentId) {
        console.log("student id:",studentId)
        try{
            const lastGameDetails = GameDetails.findOne({ where: { idJoueur: studentId }, order: [['idPartie', 'DESC']] });
            return lastGameDetails ? lastGameDetails.idPartie + 1 : 1;
        } catch (error) {
            console.error('Error getting next idPartie for student:', error);
            throw error;
        }
        
    }
    static createDetailsForStudent(newGameDetails,studentId) {
        const listgamedetailsofstudent = GameDetails.get().filter(gamedetails => gamedetails.idJoueur == studentId);
        var maxIdPartie=1;
        for(const gamedetails of listgamedetailsofstudent){
            maxIdPartie=maxIdPartie+1;
        }
        const idPartie = maxIdPartie;
        newGameDetails.idPartie = idPartie;
        return GameDetails.create(newGameDetails);
    }
    

}
module.exports = GameResumeManager;