import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'popup-add-profil',
  templateUrl: './popup-add-profil.component.html',
  styleUrls: ['./popup-add-profil.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy{

  public profilForm: FormGroup;
  @Input() id?: string;
  isOpen = false;
  private element:any;

  constructor(public popupService: PopupService,private el: ElementRef,public formBuilder: FormBuilder, public studentService: StudentService){
    this.element = el.nativeElement;
    this.profilForm = this.formBuilder.group({
        name: [''],
    })
  }

  ngOnInit(){
      this.popupService.add(this);
      document.body.appendChild(this.element);
      this.element.addEventListener('click',(el: any) =>{
        if(el.target.className === 'popup'){
            this.close();
        }
      });
  }

  ngOnDestroy(){
      this.popupService.remove(this);
      this.element.remove();
  }
  
  open(){
    this.element.style.display ='block';
    document.body.classList.add('popup-open');
    this.isOpen =true;
  }

  close(){
    this.element.style.display = 'none';
    document.body.classList.remove('popup-open');
    this.isOpen = false;
  }

  addProfil(){
    const profilToCreate: Student = this.profilForm.getRawValue() as Student;
    this.studentService.addProfil(profilToCreate);

  }
}