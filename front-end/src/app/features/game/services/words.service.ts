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
    this.words$.next(this.words);
  }

  addWordsListOfStudent(wordsList : string[], studentId : number): void{
    const listId = this.getNextListId();
    
    for(const wordText of wordsList){

      const newWord = this.createWord(wordText, studentId, listId);

      console.log("newWord : ", newWord);
      this.http.post<Word>(this.wordUrl, newWord).subscribe((word) => {
        this.addWord(word);
      });
    }
  }

  getNextListId(): number {
    const listIds = this.words.map(word => word.listId);
    const maxListIds = Math.max(...listIds, 0);
    return maxListIds + 1;
  }

  createWord(text : string, studentId : number, listId : number): Word{
    const newWord = {text: text, size : 0, listId : 0, studentId : 0};
    newWord.studentId = studentId;
    newWord.listId = listId;
    return newWord;
  }
}
