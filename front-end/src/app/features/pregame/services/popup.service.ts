import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { StudentComponent } from '../components/student/student.component';
import { Type } from '@angular/compiler';


@Injectable({providedIn: 'root'})
export class PopupService {
    private popupOpenedSource = new Subject<void>();
    popupOpened$ = this.popupOpenedSource.asObservable();

    private studentD: Student | undefined;
    private afterClosedSubject: Subject<void> = new Subject<void>();
    isOpen: boolean = false;
    isOpenDPopup: boolean =false;

    constructor() { }

    saveStudentToDelete(student: Student | undefined){
        this.studentD=student;
    }
    savedStudentToDelete(): Student | undefined {
        return this.studentD;
    }


    afterClosed(): Observable<void> {
        return this.afterClosedSubject.asObservable();
      }

    openPopup() {
        this.isOpen = true;
    }

    closePopup() {
        this.isOpen = false;
        this.afterClosedSubject.next();
    }
    openDPopup(){
        this.popupOpenedSource.next();
        this.isOpenDPopup =true;
    }
    closeDPopup(){
        this.isOpenDPopup = false;
        this.afterClosedSubject.next();
    }
    
}