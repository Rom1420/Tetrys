import { Component, OnInit } from '@angular/core';

import { StatsAvanceeService } from './services/stats-avancee.service';
import { StudentService } from 'src/app/core/components/services/student.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  selectedPlayerId: number | null = null;
  selectedGameMode: string = 'general';
  selectedStudentIdToDelete: number | null = null;

  
  constructor(private studentService: StudentService,
    private statsAvanceeService: StatsAvanceeService
  ) {}
  
  ngOnInit(): void {
    this.studentService.selectedStudentIdToDelete$.subscribe(studentId => {
      this.selectedStudentIdToDelete = studentId;
    });

    this.studentService.selectedStudentId$.subscribe(studentId => {
      this.selectedPlayerId = studentId;
      if (studentId !== null) {
        this.statsAvanceeService.fetchStatAvancee(studentId, 'general');
      }
    });
  }

  updateGameMode(gameMode: string): void {
    this.selectedGameMode = gameMode;
    this.statsAvanceeService.setGameMode(gameMode);
  }
}