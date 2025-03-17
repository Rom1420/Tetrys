import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GameResume } from 'src/app/features/stats-details/models/game-resume.model';
import { GraphService } from '../../services/graph.service';
import { Subscription } from 'rxjs';
import 'chartjs-adapter-date-fns';
import { StatsAvanceeService } from '../../services/stats-avancee.service';

Chart.register(...registerables);
@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})

export class GraphComponent implements OnInit, OnDestroy {
  selectedGameMode: String = 'general';
  gameResumes: GameResume[] = [];
  chart: Chart | undefined;
  private gameResumesSubscription: Subscription | undefined;

  constructor(private graphService: GraphService, private statAvanceeService : StatsAvanceeService) {}

  ngOnInit(): void {
    this.renderChart();
    this.subscribeToGameResumes();
  }

  ngOnDestroy(): void {
    if (this.gameResumesSubscription) {
      this.gameResumesSubscription.unsubscribe();
    }
  }

  private subscribeToGameResumes(): void {
    this.gameResumesSubscription = this.graphService.gameResumes$.subscribe(
      gameResumes => {
        this.gameResumes = gameResumes;
        this.renderChart();
      },
      error => console.error('Error observing game resumes:', error)
    );

    this.statAvanceeService.selectedGameMode$.subscribe((gameMode) => {
      this.selectedGameMode = gameMode;
      this.renderChart();
    })
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const dataForGameMode = this.getDataForGameMode(this.selectedGameMode);
    console.log('Data for Game Mode:', dataForGameMode);

    const canvas = document.getElementById('piechart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataForGameMode.labels,
        datasets: [{
          label: `Score moyen`,
          data: dataForGameMode.data,
          borderColor: 'rgb(0, 183, 255)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          pointBackgroundColor: 'rgb(0, 183, 255)',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(0, 183, 255)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                family: 'Arial', // Customize font family
                size: 14, // Customize font size
                style: 'italic', // Customize font style
                weight: 'bold'
              },
              color: 'rgb(255, 255, 255)' // Customize legend text color
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Customize tooltip background color
            titleFont: {
              family: 'Arial',
              size: 16,
              style: 'normal',
              weight: 'bold'
            },
            bodyFont: {
              family: 'Arial',
              size: 14,
              style: 'normal',
              weight: 'normal'
            },
            cornerRadius: 3
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0)' // Customize grid line color
            },
            ticks: {
              color: 'rgba(255, 255, 255, 1)', // Customize y-axis tick color
              font: {
                family: 'Arial',
                size: 12
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0)' // Customize grid line color
            },
            ticks: {
              color: 'rgba(255, 255, 255, 1)', // Customize x-axis tick color
              font: {
                family: 'Arial',
                size: 12
              },
              autoSkip: true, 
              maxRotation: 0,
              minRotation: 0,
              maxTicksLimit: 7
            }
          }
        }
      }
    });
    }
  }

  getDataForGameMode(gameMode: String): { labels: String[], data: number[] } {
    const normalizedGameMode = this.normalizeString(gameMode.toLowerCase());

    let filteredResumes: GameResume[] = [];

    if (normalizedGameMode === 'general') {
      filteredResumes = this.gameResumes;
    } else if (normalizedGameMode === 'perso') {
      filteredResumes = this.gameResumes.filter(gr => {
        const mode = this.normalizeString(gr.gameMode.toLowerCase());
        return mode !== 'debutant' && mode !== 'intermediaire' && mode !== 'avance';
      });
    } else {
      filteredResumes = this.gameResumes.filter(gr => this.normalizeString(gr.gameMode.toLowerCase()) === normalizedGameMode);
    }

    
    const labels: string[] = filteredResumes.map(gr => gr.date);
    const data: number[] = filteredResumes.map(gr => gr.gameScore);

    if(this.compareDates(labels[0] , labels[labels.length -1]) <= 0){
      return { labels, data }; 
    }
    else{
      return {labels: labels.reverse(), data: data.reverse()}
    }
  }

  normalizeString(str: String): String {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  compareDates(date1: string, date2: string): number {
    if (!date1 || !date2) {
        return 0; 
    }
  
    const [day1, month1, year1] = date1.split('/').map(Number);
    const [day2, month2, year2] = date2.split('/').map(Number);

    const d1 = new Date(year1, month1 - 1, day1);
    const d2 = new Date(year2, month2 - 1, day2);

    if (d1 < d2) {
        return -1;
    } else if (d1 > d2) {
        return 1;
    } else {
        return 0;
    }
}
}