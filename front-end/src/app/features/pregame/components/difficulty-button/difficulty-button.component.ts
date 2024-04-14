import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Difficulty } from 'src/app/features/pregame/models/difficulty.model';
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {Router} from "@angular/router";

@Component({
    selector: 'difficulty-button',
    templateUrl: './difficulty-button.component.html',
    styleUrls: ['./difficulty-button.component.scss']
})

export class DifficultyButtonComponent implements OnInit {
    @Input() difficulty!: Difficulty;
    @Input() selectedPlayerId: number | null = null;    

    @Output() hover: EventEmitter<Difficulty> = new EventEmitter<Difficulty>();

    constructor( public configFormResultService:ConfigFormResultService, private router:Router) {}
    
    
    ngOnInit(): void {}
    
    ngOnChanges(changes: SimpleChanges): void {
        if ('selectedPlayerId' in changes && changes['selectedPlayerId'].currentValue !== null) {
            console.log("Changement détecté dans selectedPlayerId : ", changes['selectedPlayerId'].currentValue);
            this.updateButtonState();
        }
    }

    updateButtonState(): void {
        const buttonContainer = document.querySelector('.difficulty-button-container');
        if (buttonContainer) {
            buttonContainer.classList.remove('disabled');
        }
    }

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
        this.router.navigate(["/game"]).catch(error => {
          console.error('Erreur de navigation :', error);});
      }
    }

    onHover(): void {
        //console.log(this.difficulty.config);
        this.hover.emit(this.difficulty);
    }



}
