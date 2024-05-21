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
  endGame$ = new BehaviorSubject(false);

  private wordsSubject = new BehaviorSubject<Word[]>([]);
  words$ = this.wordsSubject.asObservable();

  private blocksSubject = new BehaviorSubject<{ id: number, shape: boolean[][] }[]>([]);
  blocks$ = this.blocksSubject.asObservable();

  constructor(private wordsService: WordsServices, private blockService: BlockService) {
    this.initializeWordsAndBlocks(); 
  }   

  initializeWordsAndBlocks(): void {
    this.wordsService.words$.subscribe((words) => {
      if(words.length > 0) {
        console.log("juste apres le sub",this.wordsService.words);
        const randomInt: number = Math.floor(Math.random() * (words.length - 2));
    
        this.wordsService.get3Words(randomInt);

        this.wordsService.actualWords$.subscribe((actualWords) => {
          if(actualWords.length > 0){
            this.wordsSubject.next(actualWords);
            console.log("words initialize :",actualWords);
            const blocks = this.blockService.getThreeDistinctBlocks();
            this.blocksSubject.next(blocks);
          }
        });
      }
    });
  }

  resetWords(){
    this.ask4Reset.next(this.i);
    this.i++;
    this.initializeWordsAndBlocks();
  }

  getBlockFromWord(word: string): { id: number, shape: boolean[][] } | undefined {
    const wordIndex = this.wordsSubject.value.findIndex(w => w.text === word);
    if (wordIndex !== -1 && wordIndex < this.blocksSubject.value.length) {
      return this.blocksSubject.value[wordIndex];
    }
    return undefined;
  }

}
