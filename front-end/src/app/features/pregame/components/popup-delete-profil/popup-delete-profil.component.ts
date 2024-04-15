import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from 'src/app/core/components/services/student.service';
import { PopupService } from '../../services/popup.service';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'popup-delete-profil',
  templateUrl: './popup-delete-profil.component.html',
  styleUrls: ['./popup-delete-profil.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggleDPopup', [
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
export class PopupDComponent {
  @Input() selectedStudentIdToDelete: number | null = null;

  @Output() animationDone: EventEmitter<void> = new EventEmitter<void>();

  constructor(public popupService: PopupService, public studentService: StudentService){
    
  }

  ngOnChanges(changes: SimpleChanges){
    if('selectedStudentIdToDelete' in changes) {
      this.selectedStudentIdToDelete = changes['selectedStudentIdToDelete'].currentValue;
    }
  }
  
  closeDPopup() {
    this.popupService.closeDPopup();
  }

  deleteProfil() {
    if(this.selectedStudentIdToDelete) { 
      const studentToDelete = this.studentService.students.
      find(student => 
        student.id === this.selectedStudentIdToDelete);
      this.studentService.deleteProfil(studentToDelete);
      this.popupService.closeDPopup();
    }
  }


  onAnimationDone() {
    if(!this.popupService.isOpenDPopup) {
      this.animationDone.emit(); 
    }
  }
}