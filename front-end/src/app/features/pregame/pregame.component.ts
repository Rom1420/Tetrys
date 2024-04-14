import { Component, OnInit, Output } from '@angular/core';
import { PopupService } from './services/popup.service';
import { Difficulty } from './models/difficulty.model';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrl: './pregame.component.scss',

})
export class PregameComponent implements OnInit{

  isHovering: boolean = false;

  selectedPlayerId: number | null = null;
  selectedDifficulty: Difficulty | null = null;
  isMidContainerHovered: boolean = false;

  constructor(public popupService: PopupService,
    private studentService: StudentService
  ){}


  ngOnInit(): void {
    this.studentService.selectedStudentId$.subscribe((studentId: number) => {
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
  }

  onDifficultyHoverEnd(): void {
    this.isHovering = false;
    this.selectedDifficulty = null;
  }
}
