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

  constructor(private studentService: StudentService,
    private statsAvanceeService: StatsAvanceeService
  ) {}

  ngOnInit(): void {
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
