import { Component } from '@angular/core';
import { StudentService } from '../pregame/services/student.service';

@Component({
  selector: 'stats-game',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent{
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
}
