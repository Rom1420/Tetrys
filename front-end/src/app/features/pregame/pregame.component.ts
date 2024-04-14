import { Component, OnInit, Output } from '@angular/core';
import { PopupService } from './services/popup.service';
import { Difficulty } from './models/difficulty.model';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrl: './pregame.component.scss',
  
})
export class PregameComponent {
  selectedStudentIdToDelete: number | null = null;

  constructor(private studentService: StudentService){
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
    this.selectedDifficulty = difficulty;
  }

  onDifficultyHoverEnd(): void {
    this.selectedDifficulty = null;
  }
}
