import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student.model'

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})

export class StudentComponent {

    @Input()
    student: Student | undefined;

    constructor() {

    }
} 