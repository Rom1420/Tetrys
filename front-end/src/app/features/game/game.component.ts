import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigFormResultService} from "./services/config-form-result.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WordsServices} from "./services/words.service";
import {Word} from "./models/word.model";
import {GameFormService} from "./services/game-form.service";
import {GameManagerService} from "./services/game-manager.service";
import {ConfigModel} from "./models/config.model";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, AfterViewInit {

    public wordForm: FormGroup;
    private actualWords: Word[] = [{text: "", size : 0, listId : 0, studentId : 0}];
    public actualWordForm: string = "";
    public time: number = 0;
    public allTimer: any[] = [];
    private isWordValid: boolean = false;
    public endGameDisplay: boolean = false;
    @ViewChild('word') wordFormToggle!: ElementRef;
    public config: ConfigModel;
    public show2ndChance = false;
    public errorsAllowed:number = 0;

    constructor(private gameManagerService:GameManagerService, private configFormResult: ConfigFormResultService, private gameFormService: GameFormService, public wordService:WordsServices, public formBuilder: FormBuilder) {
        this.wordForm = this.formBuilder.group({
              word: [''],
              isValid: this.isWordValid,
              error: this.errorsAllowed
          });
        this.config = this.configFormResult.getConfig()
        this.configFormResult.configActual$.subscribe((actualConfig) => {
          this.config = actualConfig
        })
    }

    ngAfterViewInit(): void {
      this.wordForm.addControl('isValid', this.formBuilder.control((this.isWordValid)))
      this.wordForm.addControl('error', this.formBuilder.control((this.errorsAllowed)))
      this.wordService.actualWords$.subscribe((newWords) => {
        this.actualWords = newWords;
        this.wordForm.get('word')?.enable();
        this.wordFormToggle.nativeElement.focus();
        this.resetTimer();
      });
      this.gameManagerService.endGame$.subscribe((value) => {
        this.endGameDisplay = value;
      })

    }
    ngOnInit(){
        this.actualWords = this.wordService.getActualWords();
        this.resetTimer();
    }


    verifWord(): boolean{
        this.actualWordForm = this.wordForm.get('word')?.value.toLowerCase();
        if(this.actualWordForm.length == 1){
          this.startTimer();
        }
        this.isWordValid = this.actualWords.some(word => word.text == this.actualWordForm);
        this.wordForm.patchValue({'isValid': this.isWordValid.toString()});
        if(this.isWordValid){
          this.onSubmit();
        }
        return this.isWordValid;
    }

    resetTimer(){
      this.time = this.actualWords.reduce((motCourant, motSuivant) => {
        return motSuivant.text.length > motCourant.text.length ? motSuivant: motCourant;
      }, {text: ""}).text.length;
      this.time = this.time * this.config.time;    //ratio par caractere
      this.time = Number(this.time.toFixed(1));   //on arrondi au dixieme de secondes
      this.startTimer();
      this.pauseTimer();
    }

    startTimer(){
      const timer = setInterval(() => {
        if (this.time > 0) {
          this.time = Math.max(0, Number((this.time - 0.1).toFixed(1)));
        } else {
          console.log(this.isWordValid)
          this.onSubmit();
        }
      }, 100);
      this.allTimer.push(timer);
    }

    pauseTimer(){
      for(let timerid of this.allTimer){
        clearInterval(timerid);
      }
      this.allTimer = [];
    }



    onSubmit(){
      this.pauseTimer()
      if (!this.isWordValid && this.config.errorAllowed){
        this.errorsAllowed = 1;
        this.wordForm.patchValue({'error': this.errorsAllowed});
        console.log(this.wordForm.value)
        this.gameFormService.addResult(this.wordForm.value)
        console.log(this.gameFormService.getResults());
        this.errorsAllowed = 0;
        this.wordForm.reset();
      } else {
        this.wordForm.patchValue({'error': this.errorsAllowed});
        console.log(this.wordForm.value)
        this.gameFormService.addResult(this.wordForm.value)
        this.wordForm.get('word')?.disable();
        console.log(this.gameFormService.getResults());
        this.errorsAllowed = 0;
        this.wordForm.reset();
      }
    }
}
