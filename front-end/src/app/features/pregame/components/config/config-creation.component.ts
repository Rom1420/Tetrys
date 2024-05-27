import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {Word} from "../../../game/models/word.model";
import {WordsServices} from "../../../game/services/words.service";
import { ConfigListComponent } from '../config-list/config-list.component';

@Component({
  selector: 'app-config-creation',
  templateUrl: './config-creation.component.html',
  styleUrl: './config-creation.component.scss'
})
export class ConfigCreationComponent implements OnInit{
  @Input() showCreateConfiguration!: (() => void);
  @Input() selectedPlayerId: number | null = 0; 

  public affichageConfig: boolean = false;
  public url: string = "";
  public configForm: FormGroup;
  public words: Word[] = [];

  constructor(private router:Router, public formBuilder: FormBuilder, public configFormResultService: ConfigFormResultService, public wordsService: WordsServices) {
    this.configForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', [Validators.required, Validators.pattern('^\\d*\\.?\\d+$')]],
      length: ['', [Validators.required, Validators.pattern('^\\d+')]],
      errorAllowed: ['', [Validators.required, Validators.pattern('^(true|false)$') ]],
      wordList: ['', Validators.required],
    })
    this.wordsService.words$.subscribe((words) => {
      this.words = words;
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

  addWords() {
    let newWords: string = this.configForm.getRawValue().wordList;
    if (newWords && this.selectedPlayerId) {
      let wordArray = newWords.split(' ');
      this.wordsService.addWordsListOfStudent(wordArray, this.selectedPlayerId);
    }
  }

}
