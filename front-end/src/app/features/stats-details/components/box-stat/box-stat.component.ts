import { Component, Input } from '@angular/core';

@Component({
  selector: 'box-stat',
  templateUrl: './box-stat.component.html',
  styleUrl: './box-stat.component.scss'
})
export class BoxStatComponent {
  @Input() details: boolean = false;
  forDetails: boolean = false;


  ngOnInit() {
    this.forDetails = this.details;
  }
}
