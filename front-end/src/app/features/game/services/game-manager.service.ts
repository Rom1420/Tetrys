import {Injectable} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  i: number = 1;
  private ask4Reset = new BehaviorSubject<number>(0);
  reset$ = this.ask4Reset.asObservable();

  captureEvents$ = new BehaviorSubject<number>(0);
  endGame$ = new BehaviorSubject(false);

  constructor() {}
  resetWords(){
    this.ask4Reset.next(this.i);
    this.i++;
  }

}
