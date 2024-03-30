import {Component} from "@angular/core";
import {Router} from "@angular/router"
import {WordsServices} from "../../services/words.services";
import {Word} from "../../models/word.model";
import {Subscription} from "rxjs";
import {GameManagerService} from "../../services/game-manager.service";


@Component({
  selector: 'word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss']
})

export class WordGameComponent{

  public words: Word[] = [];
  public urlBlock: string = "../../assets/block.png";
  private reset: Subscription;
  constructor(private router: Router, public wordsService: WordsServices, private gameManagerService: GameManagerService) {
    this.reset = this.gameManagerService.reset$.subscribe(value => this.setGame());
  }

  setGame(){
      const randomInt: number = Math.floor(Math.random() * (this.wordsService.words.length - 2));
      this.words = this.wordsService.get3Word(randomInt);
  }

  redirection(){
    this.router.navigate(["/page2"]).then(() => {
      console.log('Navigation réussie !');
    }).catch(error => {
      console.error('Erreur de navigation :', error);
    });
  }
}
