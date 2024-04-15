import { Component, Input } from '@angular/core';

@Component({
  selector: 'box-stat',
  templateUrl: './box-stat.component.html',
  styleUrl: './box-stat.component.scss'
})
export class BoxStatComponent {
  @Input() details: boolean = false;
  @Input() stat: any;
  @Input() title: any;
  @Input() subtitle: any;
  @Input() showPercentage: boolean = false;
  @Input() icon: string = '';
  @Input() statType: string | null = null;

  forDetails: boolean = false;


  ngOnInit() {
    this.forDetails = this.details;
  }

  getColorForStat(): string {
    switch (this.statType) {
      case 'precisionPercentage':
        return this.getColorForPrecisionPercentage();
      case 'wordsPerMinute':
        return this.getColorForWordsPerMinute();
      case 'incorrectWordsNumber':
        return this.getColorForIncorrectWordsNumber();
      case 'correctWordsNumber':
        return this.getColorForCorrectWordsNumber();
      case 'accentsPrecisionPercentage':
        return this.getColorForAccentsPrecisionPercentage();
      case 'evolution':
        return this.getColorForEvolution();
      default:
        return 'cyan';
    }
  }
  getColorForEvolution(): string {
    if ( this.stat >= 0 ){
      return 'green'
    }else if ( this.stat >= -30 ){
      return 'orange'
    }else{
      return 'red';
    }
  } 
  
  private getColorForPrecisionPercentage(): string {
    if (this.stat >= 70) {
      return 'green';
    } else if (this.stat >= 50) {
      return 'cyan';
    } else if (this.stat >= 30) {
      return 'orange';
    }else {
      return 'red';
    }
  }

  private getColorForWordsPerMinute(): string {
    if (this.stat >= 50) {
      return 'green';
    } else if (this.stat >= 40) {
      return 'cyan';
    } else if (this.stat >= 30){
      return 'orange';
    }else{
      return 'red';
    }
  }

  private getColorForIncorrectWordsNumber(): string {
    if (this.stat >= 20) {
      return 'red';
    } else if (this.stat >= 10) {
      return 'orange';
    } else if(this.stat >= 5) {
      return 'cyan';
    }else{
      return 'green'
    }
  }

  private getColorForCorrectWordsNumber(): string {
    if (this.stat >= 50) {
      return 'green';
    } else if (this.stat >= 30) {
      return 'cyan';
    } else if(this.stat >= 20) {
      return 'orange';
    }else{
      return 'green'
    }
  }

  private getColorForAccentsPrecisionPercentage(): string {
    if (this.stat >= 90) {
      return 'green';
    } else if (this.stat >= 80) {
      return 'cyan';
    } else if(this.stat >= 50) {
      return 'orange';
    }else{
      return 'red';
    }
  }

}
