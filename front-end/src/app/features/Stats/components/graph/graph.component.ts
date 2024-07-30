import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
Chart.register(...registerables)

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})

export class GraphComponent implements OnChanges {
  
  @Input() selectedGameMode: String = 'general';
  chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGameMode']) {
      console.log("changes")
      this.renderChart();
    }
  }

  ngOnInit(): void {
    this.renderChart();
  }



  renderChart(){
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("piechart", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: `Votes for ${this.selectedGameMode}`,
          data: this.getDataForGameMode(this.selectedGameMode),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getDataForGameMode(gameMode: String): number[] {
    switch (gameMode) {
      case 'general':
        return [12, 19, 3, 5, 2, 3];
      case 'debutant':
        return [5, 10, 15, 20, 25, 30];
      case 'mode2':
        return [3, 6, 9, 12, 15, 18];
      default:
        return [0, 0, 0, 0, 0, 0];
    }
  }
}