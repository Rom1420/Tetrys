import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Student} from '../models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    public students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENT_LIST);

    private selectedStudentIdToDeleteSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    public selectedStudentIdToDelete$ = this.selectedStudentIdToDeleteSubject.asObservable();

    constructor(){

    }

    updateSelectedStudentIdToDelete(studentId: number | null): void {
        console.log("emitted", studentId);
        this.selectedStudentIdToDeleteSubject.next(studentId);
    }

    addProfil(student: Student){
        this.students.push(student);
        this.students$.next(this.students);
    }
    deleteProfil(studentToDelete: Student | undefined){
        if(studentToDelete){
            this.updateSelectedStudentIdToDelete(studentToDelete.id);
        }
        if(studentToDelete?.id){
            this.students = this.students.filter(student => student.id !== studentToDelete.id);
        }
        this.students$.next(this.students)  
    }
}