import { Component, OnInit, Output } from '@angular/core';
import { PopupService } from './services/popup.service';
import { Difficulty } from './models/difficulty.model';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrl: './pregame.component.scss',

})
export class PregameComponent {
  selectedStudentIdToDelete: number | null = null;
  public showConfig: boolean = false;

  constructor(private studentService: StudentService, 
    public popupService: PopupService){
    this.studentService.selectedStudentIdToDelete$.subscribe((studentId: number | null) => {
      if(studentId){
        console.log(studentId,"to delete");
        this.selectedStudentIdToDelete = studentId;
      }else{
        this.selectedStudentIdToDelete = null;
      }
    });
  }
  
  selectedDifficulty: Difficulty | null = null;


  onDifficultyHover(difficulty: Difficulty): void {
    this.showConfig = difficulty.id == 4;
    if (this.showConfig){
      this.selectedDifficulty = null;
    }else {
      this.selectedDifficulty = difficulty;
    }

  }

  onDifficultyHoverEnd(): void {
    this.selectedDifficulty = null;
  }
}
