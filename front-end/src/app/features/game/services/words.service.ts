import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Word} from "../models/word.model";
import {WORD_LIST} from "../mock/words.mock";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";


@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  public words: Word[] = WORD_LIST;
  private actualWords: Word[] = [];
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(this.actualWords);

  get3Words(rank: number): Word[]{
    this.actualWords = this.words.slice(rank, rank+3);
    this.words$.next(this.actualWords);
    return this.actualWords;
  }

  setWords(words: Word[]){
    this.words = words;
  }

  getActualWords(): Word[]{
    return this.actualWords;
  }

  addWord(word : Word): void{
    this.words.push(word);
    this.words$.next(this.actualWords);
  }
}
