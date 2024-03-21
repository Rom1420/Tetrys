import {Component} from "@angular/core";
import {Router} from "@angular/router"
import {WordsServices} from "../../services/words.services";
import {Word} from "../../models/word.model";


@Component({
  selector: 'word-game',
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss']
})

export class WordGameComponent{

  public words: Word[] = [];
  public urlBlock: string = "../../assets/block.png";
  public nbRandom: number = 0;

  constructor(private router: Router, public wordsService: WordsServices) {
    this.wordsService.words$.subscribe((wordsList)=>{
      const randomInt: number = Math.floor(Math.random() * (wordsList.length - 2));
      console.log(randomInt);
      this.words = wordsService.get3Word(randomInt);
    })
  }

  redirection(){
    this.router.navigate(["/page2"]).then(() => {
      console.log('Navigation réussie !');
    }).catch(error => {
      console.error('Erreur de navigation :', error);
    });
  }
}
