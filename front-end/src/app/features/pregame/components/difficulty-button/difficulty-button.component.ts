import { Component, Input, OnInit } from '@angular/core';
import { Difficulty } from 'src/app/features/pregame/models/difficulty.model';

@Component({
    selector: 'difficulty-button',
    templateUrl: './difficulty-button.component.html',
    styleUrls: ['./difficulty-button.component.scss']
})

export class DifficultyButtonComponent implements OnInit {
    @Input()
    difficulty!: Difficulty;

    constructor() {}    
    ngOnInit(): void {
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

} 