import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Difficulty } from 'src/app/features/pregame/models/difficulty.model';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {Router} from "@angular/router";

@Component({
    selector: 'difficulty-button',
    templateUrl: './difficulty-button.component.html',
    styleUrls: ['./difficulty-button.component.scss']
})

export class DifficultyButtonComponent implements OnInit {
    @Input()
    difficulty!: Difficulty;

    @Output() hover: EventEmitter<Difficulty> = new EventEmitter<Difficulty>();

    constructor( public configFormResultService:ConfigFormResultService, private router:Router) {}
    ngOnInit(): void {}
    getDifficultyClass(): string {
        switch (this.difficulty.id) {
            case 1:
                return 'debutant';
            case 2:
                return 'intermediaire';
            case 3:
                return 'avance';
            case 4:
                return 'perso';
            default:
                return '';
        }
    }

    setConfig(){
      if (this.difficulty.id != 4){
        this.configFormResultService.addResult(this.difficulty.config)
        console.log(this.configFormResultService.getResults());
        this.router.navigate(["/game"]).then(() => {
          console.log('Navigation réussie !');}).catch(error => {
          console.error('Erreur de navigation :', error);});
      }
    }

    onHover(): void {
        //console.log(this.difficulty.config);
        this.hover.emit(this.difficulty);
    }

}
