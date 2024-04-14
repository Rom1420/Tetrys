import { Component, Input } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'add-profil-button',
  templateUrl: './add-profil-button.component.html',
  styleUrl: './add-profil-button.component.scss'
})
export class AddProfilButtonComponent implements OnDestroy{ 
  @Input() selectedStudentIdToDelete: number | null = null;

  isButtonVisible:boolean = true;
  private subscription: Subscription;

  constructor(public popupService: PopupService){
    this.subscription = this.popupService.popupOpened$.subscribe(() => {
      this.isButtonVisible = false;
    });
  }
  
  /*hideButtonIfDPopup(){
    if(this.popupService.isOpenDPopup){
      this.isButtonVisible=false;
    }
  }*/

  openPopup() {
    this.isButtonVisible = false;
    this.popupService.openPopup();
  }


  handleAnimationDone() {
    this.isButtonVisible = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
