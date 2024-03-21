import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Difficulty } from "src/models/difficulty.model";
import { DIFFICULTY_LIST } from "src/mock/difficulty.mock";

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
