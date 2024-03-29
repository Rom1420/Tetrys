import { Component, Input } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {  
  totalCells = 200;

  generateArray(length: number): any[] {
    return Array(length).fill(0);
  } 

}
