import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Student} from '../../../features/pregame/models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = 
            new BehaviorSubject<Student[]>(STUDENT_LIST);

    public selectedStudentIdSubject$: BehaviorSubject<number> = 
            new BehaviorSubject<number>(0);
    public selectedStudentId$ = 
            this.selectedStudentIdSubject$.asObservable();

    constructor(){}

    addProfil(student: Student){
        this.students.push(student)
        this.students$.next(this.students)
    }

    onSelectStudent(studentId: number) {
        this.selectedStudentIdSubject$.next(studentId);
        console.log("emitted value: ", studentId);
      } 

    getStudentName(id: number): String | undefined {
        return STUDENT_LIST.find(student => student.id === id)?.name;
    }
}
