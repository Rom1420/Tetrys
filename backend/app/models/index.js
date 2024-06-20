const ConfigModel = require('./config.model.js')
const DifficultyModel = require('./difficulty.model.js')
const WordModel = require('./word.model.js')
const Student = require("./student.model.js")
const Stats = require("./stats.model.js")
const GameDetails = require("./gameDetails.model.js")
const GameResume = require('./gameResume.model.js')

module.exports = {
  ConfigModel,
  DifficultyModel,
  Word : WordModel,
  Student,
  Stats,
  GameResume,
  GameDetails,
}