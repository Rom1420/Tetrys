import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Student} from '../../../features/pregame/models/student.model';
import { STUDENT_LIST } from 'src/app/features/pregame/mock/student-list.mock'
import { HttpClient } from '@angular/common/http';
import {backUrl} from "../../../../environnement/environnement";
import {httpOptionsBase} from "../../../../configs/server.config";



@Injectable({
    providedIn: 'root'
})
export class StudentService {
    public students: Student[] = STUDENT_LIST;
    public students$: BehaviorSubject<Student[]> =
            new BehaviorSubject<Student[]>(STUDENT_LIST);

    private selectedStudentIdToDeleteSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
    public selectedStudentIdToDelete$ = this.selectedStudentIdToDeleteSubject.asObservable();

    public selectedStudentIdSubject$: BehaviorSubject<number | null> =
            new BehaviorSubject<number | null>(0);
    public selectedStudentId$ =
            this.selectedStudentIdSubject$.asObservable();

    private studentUrl = backUrl + '/students';

    private httpOptions = httpOptionsBase;

    constructor(private http: HttpClient) {
        this.retrieveStudents();
    }

    retrieveStudents(): void {
        this.http.get<Student[]>(this.studentUrl).subscribe((studentsList) => {
            this.students = studentsList;
            this.students$.next(this.students);
        });
    }

    updateSelectedStudentIdToDelete(studentId: number | null): void {
        this.selectedStudentIdToDeleteSubject.next(studentId);
    }

    addProfil(student: Student){
        this.http.post<Student>(this.studentUrl, student, this.httpOptions).subscribe(() => this.retrieveStudents());
    }

    deleteProfil(studentToDelete: Student | undefined){
        if(studentToDelete){
            this.selectedStudentIdSubject$.next(null);
            this.updateSelectedStudentIdToDelete(studentToDelete.id);
        }
        if(studentToDelete?.id){
            const urlWithId = this.studentUrl + '/' + studentToDelete.id;
            this.http.delete<Student>(urlWithId, this.httpOptions).subscribe(() => this.retrieveStudents());
        }
        this.students$.next(this.students)
        this.updateSelectedStudentIdToDelete(null);
    }

    onSelectStudent(studentId: number) {
        this.selectedStudentIdSubject$.next(studentId);
      }

    getStudentName(id: number): String | undefined {
        return this.students.find(student => student.id === id)?.name;
    }
}
