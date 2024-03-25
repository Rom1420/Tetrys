import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {Word} from "../models/word.model";
import {WORD_LIST} from "../mock/words.mock";


@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  private words: Word[] = WORD_LIST;
  private actualWords: Word[] = [];
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(WORD_LIST);


  getNumberOfWords(): number{
    return this.words.length;
  }

  get3Word(rank: number): Word[]{
    this.actualWords = this.words.slice(rank, rank+3);
    return this.words.slice(rank, rank+3);
  }

  setWords(words: Word[]){
    this.words = words;
  }

  getActualWords(): Word[]{
    return this.actualWords;
  }
}
