import { Component } from '@angular/core';
import { GameResumeService } from '../../services/game-resume.service';
import { StudentService } from 'src/app/core/components/services/student.service';
import { GameResume } from '../../models/game-resume.model';

@Component({
  selector: 'game-evolution',
  templateUrl: './game-evolution.component.html',
  styleUrl: './game-evolution.component.scss'
})
export class GameEvolutionComponent {

  selectedGameId: number | null = null;
  selectedPlayerId: number | null = null;
  gameResume: GameResume | null = null;

  constructor(public gameResumeService: GameResumeService, 
    public studentService: StudentService) {
  
      this.studentService.selectedStudentId$.subscribe((studentId: number) => {
        console.log("received event");
        if (studentId) {
          this.selectedPlayerId = studentId; 
        } else {
          console.log("No student selected");
          this.selectedPlayerId = null;
        }
      });

  }

}
