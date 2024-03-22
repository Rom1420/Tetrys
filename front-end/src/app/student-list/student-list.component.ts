import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/student.service';
import { Student } from 'src/models/student.model';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {
    public studentList: Student[] = [];

    constructor(public studentService: StudentService){
        this.studentService.students$.subscribe((studentList) => {
            this.studentList =  studentList;
        });

    }
    ngOnInit() {
        
    }
}