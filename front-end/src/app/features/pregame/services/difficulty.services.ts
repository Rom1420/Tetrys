import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Difficulty } from "src/app/features/pregame/models/difficulty.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DifficultyServices {

  public configUrl: string = "http://localhost:9428/api/difficulties/";

  private difficulties: Difficulty[] = [];

  public difficulties$: BehaviorSubject<Difficulty[]> = new BehaviorSubject(this.difficulties);
  public allDifficulties$ = this.difficulties$.asObservable()

  constructor(private http: HttpClient) {
    http.get<Difficulty[]>(this.configUrl).subscribe((list) => {
      console.log(list)
      this.difficulties$.next(list);
    });
  }


  getBasicDifficultiesTitle(): { id: number, title: string }[] {
      return this.difficulties.map(difficulty => ({id: difficulty.id, title: difficulty.name}) );
  }

}
