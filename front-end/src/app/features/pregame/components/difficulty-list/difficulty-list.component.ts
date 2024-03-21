import  { Component, OnInit } from '@angular/core';
import { DifficultyServices } from "src/app/features/pregame/services/difficulty.services";
import { Difficulty } from "src/app/features/pregame/models/difficulty.model";

@Component({
    selector: 'difficulty-list',
    templateUrl: './difficulty-list.component.html',
    styleUrls: ['./difficulty-list.component.scss']
})
export class DifficultyListComponent implements OnInit {

    public difficultyList: Difficulty[] = [];
    public basicDifficultyListWithTitles: { id: number, title: string }[] = [];

    constructor(public difficultyService: DifficultyServices) {
        this.difficultyService.difficulties$.subscribe((difficultyList) => {
            this.difficultyList = difficultyList;
        });
    }

    ngOnInit(): void {
        this.basicDifficultyListWithTitles = this.difficultyService.getBasicDifficultiesTitle();
    }
}
