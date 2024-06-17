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
        switch (this.difficulty.difficultyId) {
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

    setConfig(): void {
        if (this.difficulty.difficultyId !== 4) {
            this.configFormResultService.setConfig(this.difficulty.config);  // Met à jour la configuration
            this.configFormResultService.startGameWithConfiguration(this.difficulty.config); // Navigue vers le jeu
        }
    }

    onHover(): void {
        this.hover.emit(this.difficulty);
    }
}