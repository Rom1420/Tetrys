import {ChangeDetectorRef, Component, Input, input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {StatsAvanceeService} from "../../services/stats-avancee.service";
import {StatAvancee} from "../../models/stat-avancee.model";

@Component({
  selector:'stat-graph',
  templateUrl: './stat-graph.component.html',
  styleUrls:['./stat-graph.component.scss']
})
export class StatGraphComponent implements OnInit {
  @Input() selectedPlayerId: number | null = 0;
  @Input() selectedGameMode: String = 'general';

  statsAvancee: StatAvancee | null = null;

  constructor(private statsAvanceeService: StatsAvanceeService) {
    
  }
  ngOnInit(): void {
    this.statsAvanceeService.statsAvancee$.subscribe(statsAvancee => {
      if (Array.isArray(statsAvancee)) {
        this.statsAvancee = statsAvancee[0]; // Accéder au premier élément
      } else {
        this.statsAvancee = statsAvancee;
      }

    const titles = document.querySelectorAll(".title");
    
    titles.forEach(title => title.classList.add('hidden'));

      setTimeout(() => {
        titles.forEach(title => {
          title.classList.remove('hidden');
        });
      }, 200);
    });

    
  }

  getFormattedPourcentageErreur(pourcentageErreur : number | undefined): String {
    return pourcentageErreur != null ? `${pourcentageErreur}%` : '';
  }

  /*
  forceUpdate(): void {
    this.statsAvancee = {
      idJoueur:1718633208890,
      mode: "debutant",
      pourcentageErreur: 75,
      scoreMoyen: 86, 
      wpm: 12
    }
  }*/

  updateGameMode(gameMode: String) {
    this.statsAvanceeService.setGameMode(gameMode);

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
