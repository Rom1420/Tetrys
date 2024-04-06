import { Component } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';
import { Subscription } from 'rxjs';
import { Word } from '../../models/word.model';


@Component({
  selector: 'block-word',
  templateUrl: './block-word.component.html',
  styleUrl: './block-word.component.scss'
})
export class BlockWordComponent {
  public words: Word[] = [];
  public blocks: { id: number, shape: boolean[][] }[] = [];
  wordsSubscription: Subscription;
  blocksSubscription: Subscription;

  constructor(private gameManager: GameManagerService) { 
    this.wordsSubscription = this.gameManager.words$.subscribe(words => {
      this.words = words;
    });

    this.blocksSubscription = this.gameManager.blocks$.subscribe(blocks => {
      this.blocks = blocks;
    });
  }
}
