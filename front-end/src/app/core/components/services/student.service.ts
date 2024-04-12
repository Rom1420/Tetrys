import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import {Student} from '../../../features/pregame/models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENT_LIST);

    private selectedStudentSubject = new BehaviorSubject<Student>(this.students[0]);
    selectedStudent$: Observable<Student> = this.selectedStudentSubject.asObservable();

    constructor(){}

    addProfil(student: Student){
        this.students.push(student)
        this.students$.next(this.students)
    }
    

    onSelectStudent(student: Student) {
        this.selectedStudentSubject.next(student);
      } 

    getSelectedStudent(): Observable<Student> {
        return this.selectedStudent$;
    }

}
