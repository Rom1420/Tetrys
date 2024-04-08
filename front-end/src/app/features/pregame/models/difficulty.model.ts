import {ConfigModel} from "../../game/models/config.model";

export interface Difficulty {
  id: number;
  name: string;
  description: string;
  config: ConfigModel;
}
