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
  public showConfig: boolean = false;
  isMidContainerHovered: boolean = false;
  isHovering: boolean = false;

  selectedPlayerId: number | null = null;
  selectedStudentIdToDelete: number | null = null;
  selectedDifficulty: Difficulty | null = null;
  

  constructor(private studentService: StudentService, 
    public popupService: PopupService){
    this.studentService.selectedStudentIdToDelete$.subscribe((studentId: number | null) => {
      if(studentId){
        this.selectedStudentIdToDelete = studentId;
      }else{
        this.selectedStudentIdToDelete = null;
      }
    });
  }


  ngOnInit(): void {
    this.studentService.selectedStudentId$.subscribe((studentId: number | null) => {
      if (studentId) {
        this.selectedPlayerId = studentId; 
      } else {
        this.selectedPlayerId = null;
      }
    }); 
  }

  onMidContainerHover(): void {
    this.isMidContainerHovered = true;
  }

  onMidContainerHoverEnd(): void {
    this.isMidContainerHovered = false;
  }

  onDifficultyHover(difficulty: Difficulty): void {
    this.isHovering = true;
    if(this.selectedPlayerId != null){
      this.selectedDifficulty = difficulty;
    } 
    this.showConfig = difficulty.id == 4;
    if (this.showConfig && this.selectedPlayerId != null){
      this.selectedDifficulty = null;
    }
    else {
      this.selectedDifficulty = difficulty;
    }
  }

  onDifficultyHoverEnd(): void {
    this.isHovering = false;
    this.selectedDifficulty = null;
  }
}
