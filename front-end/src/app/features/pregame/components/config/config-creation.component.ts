import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";

@Component({
  selector: 'app-config-creation',
  templateUrl: './config-creation.component.html',
  styleUrl: './config-creation.component.scss'
})
export class ConfigCreationComponent implements OnInit{
  public affichageConfig: boolean = false;
  public url: string = "";
  public configForm: FormGroup;

  constructor(private router:Router, public formBuilder: FormBuilder, public configFormResultService: ConfigFormResultService) {
    this.configForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', [Validators.required, Validators.pattern('^\\d*\\.?\\d+$')]],
      length: ['', [Validators.required, Validators.pattern('^\\d+')]],
      errorAllowed: ['', [Validators.required, Validators.pattern('^(true|false)$') ]],
    })
  }


  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // La navigation a commencé
        console.log('URL actuelle:', this.router.url);

      }
      if (event instanceof NavigationEnd) {
        // La navigation est terminée, vous pouvez maintenant obtenir l'URL actuelle
        console.log('URL actuelle:', this.router.url);
        this.url = this.router.url;
      }
    });
  }

  afficherConfig(){
    if (this.url != "/game"){
      this.navigateToGame();
    }
    this.affichageConfig = !this.affichageConfig;
  }

  navigateToGame(){
    this.router.navigate(["/game"]).catch(error => {
      console.error('Erreur de navigation :', error);});
  }

  onSubmit(){
    if (this.configForm.valid){
      this.configFormResultService.addResult(this.configForm.value)
      this.configForm.reset();
    }
  }

  isConfigFormValid(): boolean{
    if (this.configForm.valid){
      (document.querySelector(".disabling-text") as HTMLDivElement).style.display = "none";
    }
    return this.configForm.valid;
  }

}
