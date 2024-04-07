import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../../../core/components/services/student.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'popup-add-profil',
  templateUrl: './popup-add-profil.component.html',
  styleUrls: ['./popup-add-profil.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {

  public profilForm: FormGroup;

  constructor(public popupService: PopupService,public formBuilder: FormBuilder, public studentService: StudentService){
    this.profilForm = this.formBuilder.group({
        name: [''],
    })
  }

  closePopup() {
    this.popupService.closePopup();
  }

  addProfil(){
    const profilToCreate: Student = this.profilForm.getRawValue() as Student;
    this.studentService.addProfil(profilToCreate);
    this.popupService.closePopup();
  }
}
