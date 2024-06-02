import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {ConfigFormResultService} from "../../../game/services/config-form-result.service";
import {HttpClient} from "@angular/common/http";
import {ConfigModel} from "../../../game/models/config.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {Word} from "../../../game/models/word.model";
import {WordsServices} from "../../../game/services/words.service";
import { ConfigListComponent } from '../config-list/config-list.component';
import {StudentService} from "../../../../core/components/services/student.service";

@Component({
  selector: 'app-config-creation',
  templateUrl: './config-creation.component.html',
  styleUrl: './config-creation.component.scss'
})
export class ConfigCreationComponent implements OnInit{
  @Input() showCreateConfiguration!: (() => void);

  public affichageConfig: boolean = false;
  public url: string = "";
  public configForm: FormGroup;
  private userId: number | null = 0;
  private configUrl: string = "http://localhost:9428/api/configs/";
  public words: Word[] = [];

  constructor(private studentService:StudentService, private http: HttpClient, private router:Router, public formBuilder: FormBuilder, public configFormResultService: ConfigFormResultService, public wordsService: WordsServices) {

    studentService.selectedStudentId$.subscribe((value) => {
      this.userId = value;
    })

    this.configForm = this.formBuilder.group({
      name: ['', Validators.required],
      time: ['', [Validators.required, Validators.pattern('^\\d*\\.?\\d+$')]],
      length: ['', [Validators.required, Validators.pattern('^\\d+')]],
      errorAllowed: ['', [Validators.required, Validators.pattern('^(true|false)$') ]],
      wordList: [' '],
      userId:  [this.userId, [Validators.required, Validators.pattern('^\\d+')]],
    })
    this.wordsService.words$.subscribe((words) => {
      this.words = words;
    })

  }


  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  navigateToGame(){
    this.router.navigate(["/game"]).catch(error => {
      console.error('Erreur de navigation :', error);});
  }

  onSubmit(){
    if (this.configForm.valid){
      //this.configFormResultService.addResult(this.configForm.value)
      this.http.post<ConfigModel>(this.configUrl, this.configForm.value).subscribe(() => this.retrieveConfigs())
      this.addWords();
      this.configFormResultService.startGameWithConfiguration(this.configForm.value);
      this.configForm.reset();
    }
  }

  retrieveConfigs(){
    this.http.get<ConfigModel[]>(this.configUrl).subscribe((configList) => {
      console.log(configList);
    });
  }

  isConfigFormValid(): boolean{
    if (this.configForm.valid){
      (document.querySelector(".disabling-text") as HTMLDivElement).style.display = "none";
    }
    return this.configForm.valid;
  }

  addWords() {
    let newWords: string = this.configForm.getRawValue().wordList;
    if (newWords && this.userId) {
      let wordArray = newWords.split(' ')
                              .map(word => word.trim().replace(/,$/, '')) 
                              .filter(word => word.length > 0); 

      this.wordsService.addWordsListOfStudent(wordArray, this.userId);
    }
  }

}
