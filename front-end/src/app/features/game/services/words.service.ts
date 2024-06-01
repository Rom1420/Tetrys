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

  get3Words(lengthMin: number): Word[]{
    let i: number = 0
    this.actualWords = []
    console.log("coucou")
    while (i < 3){
      const randomInt: number = Math.floor(Math.random() * (this.words.length));
      if (this.words[randomInt].name.length <= lengthMin){
        this.actualWords.push(this.words[randomInt])
        i++
      }
    }
    this.words$.next(this.actualWords);
    return this.actualWords;
  }

  getActualWords(): Word[]{
    return this.actualWords;
  }

  addWord(word : Word): void{
    this.words.push(word);
    this.words$.next(this.actualWords);
  }
}
