import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { PopupService } from '../../services/popup.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'popup-add-profil',
  templateUrl: './popup-add-profil.component.html',
  styleUrls: ['./popup-add-profil.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('togglePopup', [
      state('open', style({
        width: '20vw',
        height: '19vh',
        opacity: '1'
      })),
      state('close', style({
        opacity: '0',
        width: '0',
        height: '0'
      })),
      transition('close => open', [
        animate('0.5s cubic-bezier(0.175, 0.885, 0.2, 1.275)')
      ]),
      transition('open => close', [
        animate('0.5s ease-out')
      ])
  ])
]
})
export class PopupComponent {

  @Output() animationDone: EventEmitter<void> = new EventEmitter<void>();

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

  onAnimationDone() {
    if(!this.popupService.isOpen) {
      this.animationDone.emit(); 
    }
  }
}