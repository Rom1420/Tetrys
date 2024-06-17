import {Component, Input, input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {StatsAvanceeService} from "../../services/stats-avancee.service";
import {StatAvancee} from "../../models/stat-avancee.model";

@Component({
  selector:'stat-graph',
  templateUrl: './stat-graph.component.html',
  styleUrls:['./stat-graph.component.scss']
})
export class StatGraphComponent implements OnChanges {
  @Input() selectedPlayerId: number | null = 0;
  @Input() selectedGameMode: String | undefined = 'general';

  statsAvancee : StatAvancee | undefined;

  constructor(private statsAvanceeService: StatsAvanceeService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const titles = document.querySelectorAll(".title");
    const graphImg = document.querySelector('.graph-img');


    if ('selectedPlayerId' in changes) {
      titles.forEach(title => title.classList.add('hidden'));

      setTimeout(() => {
        titles.forEach(title => {
          title.classList.remove('hidden');
        });
      }, 200);
      this.selectedGameMode = 'general';
      this.selectedPlayerId = changes['selectedPlayerId'].currentValue;
    } else if ('selectedGameMode' in changes) {
      titles.forEach(title => title.classList.add('hidden'));

      setTimeout(() => {
        titles.forEach(title => {
          title.classList.remove('hidden');
        });
      }, 200);
      this.selectedGameMode = changes['selectedGameMode'].currentValue;
    }
    
  
    const playerId = this.selectedPlayerId;
    const gameMode = this.selectedGameMode;
  
    if (playerId !== null && gameMode) {

      this.statsAvanceeService.statByStudentIdAndGameMode$.subscribe((statAvancee) =>{
        this.statsAvancee = statAvancee;
        console.log("bonne stat :",statAvancee);
      })

      //this.statsAvancee = this.statsAvanceeService.
      /*this.statsAvanceeService.getStatAvancee(playerId, gameMode, (stat: StatAvancee) => {
        this.statsAvancee = stat; //DONC this.statsAvancee n'est pas instantanément changée
      });*/
    }
  }

  updateGameMode(gameMode: String) {
    this.statsAvanceeService.onSelectGameMode(gameMode);

    const buttons = document.querySelectorAll('.mode-button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });

    const clickedButton = document.querySelector(`.mode-button.${gameMode}`);
    if (clickedButton) {
      clickedButton.classList.add('active');
    }
  }
}
