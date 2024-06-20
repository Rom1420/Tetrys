import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin } from "rxjs";
import {Word} from "../models/word.model";

import { HttpClient } from '@angular/common/http';
import { httpOptionsBase } from '../../../../configs/server.config';
import { ConfigModel } from "../models/config.model";
import { ConfigFormResultService } from "./config-form-result.service";
import {backUrl} from "../../../../environnement/environnement";

@Injectable({
  providedIn: 'root'
})
export class WordsServices{
  public words: Word[] = [];
  public words$: BehaviorSubject<Word[]> = new BehaviorSubject(this.words);
  private actualWords: Word[] = []; // Contient les 3 mots actuellement joués
  public actualWords$: BehaviorSubject<Word[]> = new BehaviorSubject(this.actualWords);
  public config$: BehaviorSubject<ConfigModel | null> = new BehaviorSubject<ConfigModel | null>(null);

  private wordUrl = backUrl + '/words/';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private configFormResultService: ConfigFormResultService){
    this.retrieveWords()
    this.configFormResultService.configActual$.subscribe(config =>{
      this.setConfig(config);
    });
  }

  retrieveWords():void{
    console.log(this.wordUrl)
    this.http.get<Word[]>(this.wordUrl).subscribe((words) => {
      this.words = words;
      this.words$.next(this.words);
    });
  }

  get3Words(): void {
    this.config$.subscribe(config => {
      console.log(config);
      if (config) {
        const { listId, onlyWordsList, length } = config;

        const filterByLength = (words: Word[]) => words.filter(word => word.size <= length);

        if (onlyWordsList && listId !== 0) {
          console.log("voici le listId", listId);
          const url = `${this.wordUrl}listId/${listId}`;
          this.http.get<Word[]>(url).subscribe((words) => {
            const filteredWords = filterByLength(words);
            this.actualWords = this.getRandomWords(filteredWords, 3);
            this.actualWords$.next(this.actualWords);
          });
        } else if (listId !== 0) {
          const urlListId = `${this.wordUrl}listId/${listId}`;
          const urlListIdZero = `${this.wordUrl}listId/0`;

          forkJoin([
            this.http.get<Word[]>(urlListId),
            this.http.get<Word[]>(urlListIdZero)
          ]).subscribe(([wordsListId, wordsListIdZero]) => {
            const combinedWords = wordsListId.concat(wordsListIdZero);
            const filteredWords = filterByLength(combinedWords);
            this.actualWords = this.getRandomWords(filteredWords, 3);
            this.actualWords$.next(this.actualWords);
          });
        } else {
          this.http.get<Word[]>(this.wordUrl).subscribe((words) => {
            const filteredWords = filterByLength(words);
            this.actualWords = this.getRandomWords(filteredWords, 3);
            this.actualWords$.next(this.actualWords);
          });
        }
      }
    });
  }

  getRandomWords(words: Word[], count: number): Word[] {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  setConfig(config: ConfigModel) {
    console.log("config before set", config);
    this.config$.next(config);
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

  addWordsListOfStudent(wordsList: string[], studentId: number, listId: number): void {
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
