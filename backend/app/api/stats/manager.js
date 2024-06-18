const { Stats } = require('../../models')

class StatsManager {

    static getAllStats(){
        return Stats.get();
    }

    static getStatsOfStudentIdAndGameMode(studentId, gameMode){
        return Stats.get().filter(stat => stat.idJoueur == studentId && stat.mode == gameMode);
    }

    static async createStats(stats){
        const createdStats = [];
        for (const statData of stats) {
            const {idJoueur, mode, wpm, scoreMoyen, pourcentageErreur} = statData;
            try {
                const newStat = Stats.create({idJoueur : idJoueur, mode : mode, wpm : wpm, scoreMoyen : scoreMoyen, pourcentageErreur : pourcentageErreur});
                createdStats.push(newStat);
            } catch (err) {
                console.error(`Error creating stat: ${idJoueur}`, err);
                throw err;
            }
        }
        return createdStats;
    }
}



module.exports = StatsManager;