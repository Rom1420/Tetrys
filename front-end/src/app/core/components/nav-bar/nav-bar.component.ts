import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigFormResultService} from "../../../features/game/services/config-form-result.service";
import {ConfigModel} from "../../../features/game/models/config.model";
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})

export class NavbarComponent {


  constructor(public router:Router) {
  }

  navigateToPreGame(){
    this.router.navigate(["/pre-game"]).then(() => {
      console.log('Navigation réussie !');}).catch(error => {
      console.error('Erreur de navigation :', error);});
  }

  navigateToStats(){
    this.router.navigate(["/pre-game"]).then(() => {
      console.log('Navigation réussie !');}).catch(error => {
      console.error('Erreur de navigation :', error);});
  }

}
