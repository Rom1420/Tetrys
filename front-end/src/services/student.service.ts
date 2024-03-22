import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Student} from '../models/student.model';
import { STUDENT_LIST } from 'src/mocks/student-list.mock';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> = new BehaviorSubject(STUDENT_LIST);

    constructor(){

    }
}