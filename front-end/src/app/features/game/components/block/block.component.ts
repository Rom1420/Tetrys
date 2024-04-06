import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent implements OnChanges {
  @Input() shape!: boolean[][];
  @Input() id!: number;
  
  cells: boolean[][];

  constructor() {
    this.cells = this.initCells();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shape'] && changes['shape'].currentValue) {
      this.cells = this.colorGridFromPiece();
    }
  }

  private initCells(): boolean[][] {
    return new Array(3).fill(null).map(() => new Array(4).fill(false));
  } 

  colorGridFromPiece(): boolean[][] {
    let cells: boolean[][] = new Array(3).fill(null).map(() => new Array(4).fill(false));
    console.log(this.shape);

    console.log(this.shape[0].length);
    console.log(this.shape.length);
    
    const x = Math.floor((4 - this.shape[0].length) / 2);
    const y = 3 - this.shape.length;

    console.log("x :",x);
    console.log("y :",y);

    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        cells[y + i][x + j] = this.shape[i][j];
      }
    }
    return cells;
  }
} 
