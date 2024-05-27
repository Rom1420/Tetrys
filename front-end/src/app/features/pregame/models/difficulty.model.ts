import {ConfigModel} from "../../game/models/config.model";

export interface Difficulty {
  difficultyId: number;
  name: string;
  description: string;
  config: ConfigModel;
}
