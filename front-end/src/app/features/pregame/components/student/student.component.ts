import { Component, Input } from '@angular/core';
import { Student } from '../../models/student.model'
import { PopupService } from '../../services/popup.service';
import { StudentService } from 'src/app/core/components/services/student.service';

@Component({
    selector: 'student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
})

export class StudentComponent {
  public studentList: Student[] = [];

    @Input()student: Student | undefined;
    @Input() profilePicture: string | undefined;

    constructor(public popupService: PopupService, private studentService: StudentService) {
        this.studentService.students$.subscribe((studentList) => {
            this.studentList = studentList;
          });
    }

    maximumId() : number {
      let x : number = 0;
      for(let student of this.studentList){
        if(student.id > x)
          x = student.id;
      }
      return x=1;
    }

    ngOnInit() {};


    openDPopup(){
        if(!this.popupService.isOpen){
            this.popupService.openDPopup();
        }
    }

    updateSelectedStudentIdToDelete(student : Student | null){
        if(student){
            this.studentService.updateSelectedStudentIdToDelete(student.id);
        }
    }

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

      onSelectStudent(student: Student): void {
        this.studentList.forEach(s => s.isSelected = false);
        student.isSelected = true;
        this.studentService.onSelectStudent(student.id);
      }
}
