import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/components/services/student.service';
import { StatsAvanceeService } from './services/stats-avancee.service';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  selectedPlayerId: number | null = null; 
  selectedGameMode: String | undefined = "Général";
  selectedStudentIdToDelete: number | null = null;

  constructor(private studentService: StudentService,
    private statsAvanceeService: StatsAvanceeService
  ) {}
  
  ngOnInit(): void {

    this.studentService.selectedStudentIdToDelete$.subscribe((studentId: number | null) => {
      if(studentId){
        console.log(studentId,"to delete");
        this.selectedStudentIdToDelete = studentId;
      }else{
        this.selectedStudentIdToDelete = null;
      }
    });

    this.studentService.selectedStudentId$.subscribe((studentId: number) => {
      if (studentId) {
        this.selectedPlayerId = studentId; 
      } else {
        this.selectedPlayerId = null;
      }
    });
    
    this.statsAvanceeService.selectedGameMode$.subscribe((gameMode : String) => {
      if(gameMode){
        this.selectedGameMode = gameMode;
      }
    });
  }
}
