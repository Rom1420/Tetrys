const { Stats } = require('../../models')

class StatsManager {

    static getAllStats(){
        return Stats.get();
    }

    static getStatsOfStudentIdAndGameMode(studentId, gameMode){
        return Stats.get().filter(stat => stat.idJoueur == studentId && stat.mode == gameMode);
    }
}

module.exports = StatsManager;