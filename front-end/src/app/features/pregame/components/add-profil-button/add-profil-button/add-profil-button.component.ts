import { Component } from '@angular/core';
import { PopupService } from '../../../services/popup.service';


@Component({
  selector: 'add-profil-button',
  templateUrl: './add-profil-button.component.html',
  styleUrl: './add-profil-button.component.scss'
})
export class AddProfilButtonComponent { 
  constructor(public popupService: PopupService){

  }

  openPopup() {
    this.popupService.openPopup();
  }
}
