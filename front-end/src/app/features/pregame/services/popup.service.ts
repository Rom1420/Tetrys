import { Injectable } from '@angular/core';

import { PopupComponent } from '../components/popup-add-profil/popup-add-profil.component';

@Injectable({providedIn: 'root'})
export class PopupService {
    private popups: PopupComponent[] = [];

    add(popup: PopupComponent){
        if(!popup.id || this.popups.find(x => x.id === popup.id)){
            throw new Error('le popup doit avoir un unique id');
        }
        this.popups.push(popup);
    }
    remove(popup: PopupComponent){
        this.popups=this.popups.filter(x => x===popup);
    }
    open(id: string){
        const popup = this.popups.find(x => x.id === id);
        if(!popup){
            throw new Error('popup non trouvé');
        }
        popup.open();
    }
    close(){
        const popup= this.popups.find(x => x.isOpen);
        popup?.close();
    }
}