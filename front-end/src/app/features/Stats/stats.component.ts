import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  selectedPlayerId: number | null = null; 

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.selectedStudentId$.subscribe((studentId: number) => {
      if (studentId) {
        this.selectedPlayerId = studentId; 
      } else {
        this.selectedPlayerId = null;
      }
    });
  }
}
