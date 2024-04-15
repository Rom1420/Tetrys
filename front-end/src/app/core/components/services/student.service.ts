import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Student} from '../../../features/pregame/models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    public students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = 
            new BehaviorSubject<Student[]>(STUDENT_LIST);

    private selectedStudentIdToDeleteSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    public selectedStudentIdToDelete$ = this.selectedStudentIdToDeleteSubject.asObservable();

    public selectedStudentIdSubject$: BehaviorSubject<number> = 
            new BehaviorSubject<number>(0);
    public selectedStudentId$ = 
            this.selectedStudentIdSubject$.asObservable();

    constructor(){}

    updateSelectedStudentIdToDelete(studentId: number | null): void {
        console.log("emitted", studentId);
        this.selectedStudentIdToDeleteSubject.next(studentId);
    }

    addProfil(student: Student){
        this.students.push(student)
        this.students$.next(this.students)
    }

    deleteProfil(studentToDelete: Student | undefined){
        if(studentToDelete){
            this.updateSelectedStudentIdToDelete(studentToDelete.id);
            console.log(studentToDelete.id);
        }
        if(studentToDelete?.id){
            this.students = this.students.filter(student => student.id !== studentToDelete.id);
        }
        this.students$.next(this.students)  
    }

    onSelectStudent(studentId: number) {
        this.selectedStudentIdSubject$.next(studentId);
      } 

    getStudentName(id: number): String | undefined {
        return STUDENT_LIST.find(student => student.id === id)?.name;
    }
}
