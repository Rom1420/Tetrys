import {Injectable} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { BlockService } from "./block.service";
import { WordsServices } from "./words.service";
import {Word} from "../models/word.model";
import {ConfigFormResultService} from "./config-form-result.service";
import {ConfigModel} from "../models/config.model";

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

  private config:ConfigModel;

  constructor(private wordsService: WordsServices, private blockService: BlockService, private configFormResultService: ConfigFormResultService) {
    this.initializeWordsAndBlocks();
    this.config = this.configFormResultService.getConfig()
    this.configFormResultService.configActual$.subscribe((actualConfig) => {
      this.config = actualConfig
    })
  }

  initializeWordsAndBlocks(): void {
    const words = this.wordsService.get3Words(this.configFormResultService.getConfig().length);
    const blocks = this.blockService.getThreeDistinctBlocks();
    this.wordsSubject.next(words);
    this.blocksSubject.next(blocks);
  }
  resetWords(){
    this.ask4Reset.next(this.i);
    this.i++;
    this.initializeWordsAndBlocks();
  }

  getBlockFromWord(word: string): { id: number, shape: boolean[][] } | undefined {
    const wordIndex = this.wordsSubject.value.findIndex(w => w.name === word);
    if (wordIndex !== -1 && wordIndex < this.blocksSubject.value.length) {
      return this.blocksSubject.value[wordIndex];
    }
    return undefined;
  }

}
