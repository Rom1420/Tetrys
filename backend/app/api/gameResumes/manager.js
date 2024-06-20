const { GameResume } = require('../../models')

class GameResumeManager {
    static getAllGameResume(){
        return GameResume.get();
    }

    static getGameResumeOfPlayer(idJoueur){
        console.log("dans la fonction")
        return GameResume.get().filter(gameresume => gameresume.idJoueur == idJoueur);
    }
    static getGameResumeById(gameresumeId){
        return GameResume.get().filter(gameresume => gameresume.id == gameresumeId);
    }
    static async createGameResume({idJoueur,idPartie,gameMode,gameScore,gameStars,date}){
        try {
            const newGameResume = GameResume.create({idJoueur: idJoueur,idPartie: getNextIdPartieForStudent(idJoueur),gameMode: gameMode,gameScore: gameScore,gameStars: gameStars,date: date});
            return newGameResume;
        } catch (err) {
            console.error('Error creating gameResume in manager:', err);
            throw err;
        }
    }
    static async createGameResumes(gameresumes){
        const createdGameResumes = [];
        for(const gameResumeData of gameresumes){
            const {idJoueur,idPartie,gameMode,gameScore,gameStars,date}=gameResumeData;
            try{
                const newGameResume = await this.createGameResume({idJoueur,idPartie,gameMode,gameScore,gameStars,date});
                createdGameResumes.push(newGameResume);
            } catch (err) {
                console.error(`Error creating gameResume: ${text}`, err);
                throw err;
            }
        }
        return createdGameResumes;
    }
    static getNextIdPartieForStudent(studentId) {
        console.log("student id:",studentId)
        try{
            const lastGameResume = GameResume.findOne({ where: { idJoueur: studentId }, order: [['idPartie', 'DESC']] });
            return lastGameResume ? lastGameResume.idPartie + 1 : 1;
        } catch (error) {
            console.error('Error getting next idPartie for student:', error);
            throw error;
        }
        
    }
    static createResumeForStudent(newGameResume,studentId) {
        const listgameresumeofstudent = GameResume.get().filter(gameresume => gameresume.idJoueur == studentId);
        var maxIdPartie=1;
        for(const gameresume of listgameresumeofstudent){
            maxIdPartie=maxIdPartie+1;
        }
        const idPartie = maxIdPartie;
        newGameResume.idPartie = idPartie;
        return GameResume.create(newGameResume);
    }
    

}
module.exports = GameResumeManager;