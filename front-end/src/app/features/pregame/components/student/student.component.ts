import {Component, Input} from '@angular/core';
import { StudentService } from 'src/app/core/components/services/student.service';
import {Student} from '../../models/student.model'

@Component({
    selector: 'student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
})

export class StudentComponent {
  public studentList: Student[] = [];

  constructor(public studentService: StudentService){
    this.studentService.students$.subscribe((studentList) => {
      this.studentList = studentList;
    });
  }

    @Input()
    student: Student | undefined;


    ngOnInit() {};

    selected() : void{
      for(let student_i of this.studentList){
        if(this.student != student_i)
          student_i.isSelected = false;
      }
      if(this.student){
        this.student.isSelected = !this.student.isSelected;
      }
    }

    getSelect() : boolean{
      if(this.student)
        return this.student.isSelected;
      else
        return false;
    }

}
