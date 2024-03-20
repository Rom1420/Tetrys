import {Component} from "@angular/core";

@Component({
  selector: 'app-word-game',
  templateUrl: './app.word-game.html',
  styleUrls: ['./app.word-game.scss']
})

export class AppWordGame {
  constructor() {
  }

  public words: string[] = ["Hello", "Bonjour", "Salut"];

}
