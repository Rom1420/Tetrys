import { Injectable } from '@angular/core';

import { PopupComponent } from '../components/popup-add-profil/popup-add-profil.component';

@Injectable({providedIn: 'root'})
export class PopupService {
    isOpen: boolean = false;

    constructor() { }

    openPopup() {
        this.isOpen = true;
    }

    closePopup() {
        this.isOpen = false;
    }

    
}