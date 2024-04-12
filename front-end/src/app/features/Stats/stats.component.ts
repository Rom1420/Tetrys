import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  selectedPlayerId: number = 1; 

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.selectedStudent$.subscribe(student => {
      console.log(student.id);
      this.selectedPlayerId = student.id; 
    });
  }
}
