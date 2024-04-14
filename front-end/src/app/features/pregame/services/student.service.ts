import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Student} from '../models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENT_LIST);

    constructor(){

    }
    addProfil(student: Student){
        this.students.push(student)
        this.students$.next(this.students)
    }
    deleteProfil(student: Student) {
        const index = this.students.findIndex(s => s === student);
        this.students.splice(index, 1)
        this.students$.next(this.students)  
    }
}