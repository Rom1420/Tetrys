const { Stats } = require('../../models')

class StatsManager {

    static getAllStats(){
        return Stats.get();
    }

    static getStatsOfStudentIdAndGameMode(studentId, gameMode){
        return Stats.get().filter(stat => stat.idJoueur == studentId && stat.mode == gameMode);
    }

    static async createStat({id, mode, wpm, scoreMoyen, pourcentageErreur}){
        if (typeof mode !== 'string' || mode.trim() === '') {
            console.error('Invalid mode text');
            return null;
        }
        if (this.isInWordsList(id)) {
            console.log('Stat already exists:', id);
            return null; 
        }

        try {
            const newStat = Stats.create({id : id, mode : mode, wpm : wpm, scoreMoyen : scoreMoyen, pourcentageErreur : pourcentageErreur});
            return newStat;
        } catch (err) {
            console.error('Error creating stat in manager:', err);
            throw err;
        }
    }

    static async createStats(stats){
        const createdStats = [];
        for (const statData of stats) {
            const {id, mode, wpm, scoreMoyen, pourcentageErreur} = statData;
            try {
                const newStat = await this.createStat({ id, mode, wpm, scoreMoyen, pourcentageErreur });
                createdStats.push(newStat);
            } catch (err) {
                console.error(`Error creating stat: ${id}`, err);
                throw err;
            }
        }
        return createdStats;
    }


    static isInStatsList(id) {
        const stats = this.getAllStats();
        return stats.some(stat => stat.id === id);
    }
}

module.exports = StatsManager;