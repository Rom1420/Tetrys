import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {Word} from "../models/word.model";
import {WORD_LIST} from "../mock/words.mock";
import {Difficulty} from "../../pregame/models/difficulty.model";
import {DIFFICULTY_LIST} from "../../pregame/mock/difficulty.mock";


@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  private words: Word[] = WORD_LIST;
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(WORD_LIST);

  getNumberOfWords(): number{
    return this.words.length;
  }

  get3Word(rank: number): Word[]{
    return this.words.slice(rank, rank+3)
  }
}
