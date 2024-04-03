import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {Word} from "../models/word.model";
import {WORD_LIST} from "../mock/words.mock";


@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  public words: Word[] = WORD_LIST;
  private actualWords: Word[] = [];
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(this.actualWords);




  get3Word(rank: number): Word[]{
    this.actualWords = this.words.slice(rank, rank+3);
    this.words$.next(this.actualWords);
    return this.actualWords;
  }

  getActualWords(): Word[]{
    return this.actualWords;
  }
}
