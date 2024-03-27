import { Component, Output } from '@angular/core';
import { PopupService } from './services/popup.service';
@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrl: './pregame.component.scss'
})
export class PregameComponent {
  constructor(public popupService: PopupService){}
  
  
}
