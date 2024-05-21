import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Word} from "../models/word.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../../../../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  public words: Word[] = [];
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(this.words);
  private actualWords: Word[] = []; // Contient les 3 mots actuellement joués
  public actualWords$: BehaviorSubject<Word[]> = new BehaviorSubject(this.actualWords);
  
  private wordUrl = serverUrl + '/words';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient){
    this.retrieveWords()
  }

  retrieveWords():void{
    this.http.get<Word[]>(this.wordUrl).subscribe((words) => {
      this.words = words;
      this.words$.next(this.words);
    });
  }

  get3Words(rank: number, accentuated: boolean = false, listId: number = 0): void{
    let url = '${this.wordUrl}'

    if(listId !== 0){
       url = `${this.wordUrl}/listId/${listId}`;
    } else {
      let url = `${this.wordUrl}`;
      if (accentuated) {
        url = `${this.wordUrl}/accentuated`;
      }
      this.http.get<Word[]>(url).subscribe((words) => {
        this.actualWords = words.slice(rank, rank + 3);
        console.log("get3Words",this.actualWords);  
        this.actualWords$.next(this.actualWords);
      });
    }
  }
    

  setWords(words: Word[]){
    this.words = words;
  }

  getActualWords(): Word[]{
    return this.actualWords;
  }

  deleteWord(wordId: string): void {
    this.http.delete<any>(`${this.wordUrl}/${wordId}`);
  }

  addWord(word : Word): void{
    this.words.push(word);
    this.words$.next(this.actualWords);
  }
}
