import {Injectable} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { BlockService } from "./block.service";
import { WordsServices } from "./words.service";
import {Word} from "../models/word.model";

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  i: number = 1;
  private ask4Reset = new BehaviorSubject<number>(0);
  reset$ = this.ask4Reset.asObservable();

  captureEvents$ = new BehaviorSubject<number>(0);

  private wordsSubject = new BehaviorSubject<Word[]>([]);
  words$ = this.wordsSubject.asObservable();

  private blocksSubject = new BehaviorSubject<{ id: number, shape: boolean[][] }[]>([]);
  blocks$ = this.blocksSubject.asObservable();

  constructor(private wordsService: WordsServices, private blockService: BlockService) {
    this.initializeWordsAndBlocks();
  }

  initializeWordsAndBlocks(): void {
    const randomInt: number = Math.floor(Math.random() * (this.wordsService.words.length - 2));
    const words = this.wordsService.get3Words(randomInt);
    const blocks = this.blockService.getThreeDistinctBlocks();

    this.wordsSubject.next(words);
    this.blocksSubject.next(blocks);
  }
  resetWords(){
    this.ask4Reset.next(this.i);
    this.i++;
    this.initializeWordsAndBlocks();
  }

}
