import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Difficulty } from "src/app/features/pregame/models/difficulty.model";
import { DIFFICULTY_LIST } from "src/app/features/pregame/mock/difficulty.mock";

@Injectable({
  providedIn: 'root'
})
export class DifficultyServices {

  private difficulties: Difficulty[] = DIFFICULTY_LIST;

  public difficulties$: BehaviorSubject<Difficulty[]> = new BehaviorSubject(DIFFICULTY_LIST);

  getDifficulties(): Difficulty[] {
      return DIFFICULTY_LIST;
  }

  getBasicDifficultiesTitle(): { id: number, title: string }[] {
      const basicDifficulties = this.difficulties.slice(0, 3);
      return basicDifficulties.map(difficulty => ({id: difficulty.id, title: difficulty.name}) );
  }

}
