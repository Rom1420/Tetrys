import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model'
import { PopupService } from '../../services/popup.service';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})

export class StudentComponent {

    @Input()student: Student | undefined;

    constructor(public popupService: PopupService, private studentService: StudentService) {
    }
    ngOnInit() {};


    openDPopup(){
        this.popupService.openDPopup();
    }

    updateSelectedStudentIdToDelete(student : Student | null){
        if(student){
            this.studentService.updateSelectedStudentIdToDelete(student.id);
        }
    }
} 