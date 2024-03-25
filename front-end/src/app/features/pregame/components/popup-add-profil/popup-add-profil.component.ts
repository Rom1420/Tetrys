import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup-add-profil.component.html',
  styleUrls: ['./popup-add-profil.component.css']
})
export class PopupComponent {

  showPopup: boolean = false;
  public profilForm: FormGroup;

  constructor(public formbuilder: FormBuilder, public studentService: StudentService){
    this.profilForm = this.formbuilder.group({
        name: [''],
    })
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  addProfil(){
    const profilToCreate: Student = this.profilForm.getRawValue() as Student;
    this.studentService.addProfil(profilToCreate);
    
  }
}