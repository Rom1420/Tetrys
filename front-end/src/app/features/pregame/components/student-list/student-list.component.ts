import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/features/pregame/services/student.service';
import { Student } from 'src/app/features/pregame/models/student.model';

@Component({
    selector: 'student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {
    @Input() selectedStudentIdToDelete: number | null = null;
    public studentList: Student[] = [];

    constructor(public studentService: StudentService){
        this.studentService.students$.subscribe((studentList) => {
            this.studentList =  studentList;
        });

    }
    ngOnInit() {
        
    }
}