import { Component, Input } from '@angular/core';

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  @Input() shape!: boolean[][];
}
