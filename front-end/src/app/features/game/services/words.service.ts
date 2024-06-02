import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {Word} from "../models/word.model";

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
  
  private wordUrl = serverUrl + '/words/';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient){
    this.retrieveWords()
  }

  retrieveWords():void{
    console.log(this.wordUrl)
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

  addWordsListOfStudent(wordsList: string[], studentId: number): void {
  const listId = this.getNextListId();
  console.log('wordList', wordsList, "de ", wordsList.length);

  for (const wordText of wordsList) {
    const newWord = this.createWord(wordText, studentId, listId);
    console.log('newWord', newWord);

    if (!this.words.some(word => word.text === newWord.text && word.listId === newWord.listId)) {
      console.log(this.words.length)
      this.http.post<Word>(this.wordUrl, newWord).subscribe({
        next: (word) => {
          console.log('Word added', word);
        },
        error: (err) => {
          console.error('Error adding word', err);
        }
      });
    }
  }
}

  getNextListId(): number {
    const listIds = this.words.map(word => word.listId);
    const maxListIds = Math.max(...listIds, 0);
    return maxListIds + 1;
  }

  createWord(text: string, studentId: number, listId: number): Word {
    const newWord: Word = {
      text: text,
      size: text.length,
      listId: listId,
      studentId: studentId,
    };
    return newWord;
}
}
