import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfigFormResultService} from "../../../features/game/services/config-form-result.service";
@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})

export class NavbarComponent implements AfterViewInit, OnInit {
    public affichageConfig: boolean = false;
    public url: string = "";
    public configForm: FormGroup;

    constructor(private router:Router, public formBuilder: FormBuilder, public configFormResultService: ConfigFormResultService) {
        this.configForm = this.formBuilder.group({
            time: ['', [Validators.required, Validators.pattern('^\\d*\\.?\\d+$')]],
            length: ['', [Validators.required, Validators.pattern('^\\d+')]],
            errorAllowed: ['', [Validators.required, Validators.pattern('^(true|false)$') ]]
        })
    }

    ngAfterViewInit(): void {}

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
        this.router.navigate(["/game"]).then(() => {
            console.log('Navigation réussie !');}).catch(error => {
            console.error('Erreur de navigation :', error);});
    }

    onSubmit(){
        if (this.configForm.valid){
          this.configFormResultService.addResult(this.configForm.value)
          this.configForm.reset();
        }
    }
}
