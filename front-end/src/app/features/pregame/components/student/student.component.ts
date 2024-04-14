import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model'
import { PopupService } from '../../services/popup.service';

@Component({
    selector: 'student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})

export class StudentComponent {

    @Input()
    student: Student | undefined;

    constructor(public popupService: PopupService) {
    }
    ngOnInit() {};


    openDPopup(){
        this.popupService.saveStudentToDelete(this.student);
        this.popupService.openDPopup();
    }
} 