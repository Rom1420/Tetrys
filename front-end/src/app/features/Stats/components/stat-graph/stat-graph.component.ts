import {Component, Input, input, OnInit} from "@angular/core";
import {StatsAvanceeService} from "../../services/stats-avancee.service";
import {StatAvancee} from "../../models/stat-avancee.model";
@Component({
  selector:'stat-graph',
  templateUrl: './stat-graph.component.html',
  styleUrls:['./stat-graph.component.scss']
})
export class StatGraphComponent implements OnInit {
  public statsAvanceeList : StatAvancee[] = [];

  constructor(public StatsAvanceeService : StatsAvanceeService) {
    this.StatsAvanceeService.statsAvanceeList$.subscribe((statsAvanceeList) =>{
      this.statsAvanceeList = statsAvanceeList;
    })
  }

  ngOnInit() {
    const buttons = document.querySelectorAll('.mode-button');
    const titles = document.querySelectorAll(".title");
    const graphImg = document.querySelector('.graph-img');

    this.updateStats('general');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        titles.forEach(title => {
          title.setAttribute('data-status', 'unknown');
        });
        if(graphImg) {
          graphImg.setAttribute('data-status', 'unknown');
        }
        setTimeout(() => {
          titles.forEach(title => {
            title.setAttribute('data-status', 'active');
          });
          if(graphImg) {
            graphImg.setAttribute('data-status', 'active');
        }
        }, 300);
      });
    });
  }

  updateStats(mode: String) {
    for(let stat of this.statsAvanceeList){
      if(stat.mode == mode){
        //@ts-ignore
        document.getElementById('wpm').innerText = stat.wpm;
        // @ts-ignore
        document.getElementById('scoreMoyen').innerText = stat.scoreMoyen + "";
        // @ts-ignore
        document.getElementById('pourcentageErreur').innerText = stat.pourcentageErreur + "%";
      }
    }
  }
}
