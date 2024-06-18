const { GameResume } = require('../../models')

class GameResumeManager{
    static getAllGameResume(){
        return GameResume.get();
    }

    static getGameResumeByIdPlayerAndIdGame(idJoueur, idPartie){
        return GameResume.get().filter(game => game.idJoueur == idJoueur && game.idPartie == idPartie);
    }
}