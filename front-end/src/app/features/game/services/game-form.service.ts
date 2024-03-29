import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameFormService {
  formResults: any[] = [];

  constructor() {}

  addResult(result: any) {
    this.formResults.push(result);
  }

  getResults() {
    return this.formResults;
  }
}
