import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentService } from 'src/app/core/components/services/student.service';

@Injectable({
  providedIn: 'root'
})
export class StatsDetailsService {

  public selectedGameIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  selectedGameId$ = this.selectedGameIdSubject.asObservable();

  selectedPlayerId: number | null = null; 
  selectedPlayerName: String | undefined;

  constructor(private studentService: StudentService) {
    this.studentService.selectedStudentId$.subscribe((studentId: number | null) => {
      if (studentId) {
        this.selectedPlayerId = studentId; 
        this.selectedPlayerName = this.studentService.getStudentName(studentId);
      } else {
        this.selectedPlayerId = null;
      }
    });
  }

  selectedGameId(id: any) {
      this.selectedGameIdSubject.next(id);
  }
}