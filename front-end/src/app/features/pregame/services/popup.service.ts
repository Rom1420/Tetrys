import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PopupService {
    private afterClosedSubject: Subject<void> = new Subject<void>();
    isOpen: boolean = false;

    constructor() { }


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
    
}