import {Component, Input} from "@angular/core";
import {Router} from "@angular/router"
import {WordsServices} from "../../services/words.service";
import {Word} from "../../models/word.model";
import {Subscription} from "rxjs";
import {GameManagerService} from "../../services/game-manager.service";


@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})

export class WordComponent{
  @Input() word!: Word;

  constructor( public wordsService: WordsServices, private gameManagerService: GameManagerService) {}
}
