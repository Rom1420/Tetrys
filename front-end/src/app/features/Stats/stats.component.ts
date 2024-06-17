import { Component, OnInit } from '@angular/core';

import { StatsAvanceeService } from './services/stats-avancee.service';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  selectedPlayerId: number | null = null; 
  selectedGameMode: String  = "Général";
  selectedStudentIdToDelete: number | null = null;

  constructor(private studentService: StudentService,
    private statsAvanceeService: StatsAvanceeService
  ) {}
  
  ngOnInit(): void {

    this.studentService.selectedStudentIdToDelete$.subscribe((studentId: number | null) => {
      if(studentId){
        this.selectedStudentIdToDelete = studentId;
      }else{
        this.selectedStudentIdToDelete = null;
      }
    });

    this.studentService.selectedStudentId$.subscribe((studentId: number | null) => {
      if (studentId) {
        this.selectedPlayerId = studentId; 
        this.statsAvanceeService.updateStatsForStudent(studentId, this.selectedGameMode);
        console.log("change student to : ",this.selectedPlayerId);
      } else {
        this.selectedPlayerId = null;
      }
    });
    
    this.statsAvanceeService.selectedGameMode$.subscribe((gameMode : String) => {
      if(gameMode && this.selectedPlayerId){
        this.selectedGameMode = gameMode;
        console.log("change mode to : ",this.selectedGameMode);
        this.statsAvanceeService.updateStatsForStudent(this.selectedPlayerId, gameMode);
      }
    });
  }
}
