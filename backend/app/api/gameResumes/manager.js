const { GameResume } = require('../../models')

class GameResumeManager {
    static getAllGameResume(){
        return GameResume.get();
    }

    static getGameResumeOfPlayer(idJoueur){
        return GameResume.get().filter(h => h.idJoueur == idJoueur);
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
    

}
module.exports = GameResumeManager;