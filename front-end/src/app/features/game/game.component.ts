import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigFormResultService} from "./services/config-form-result.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WordsServices} from "./services/words.services";
import {Word} from "./models/word.model";
import {GameFormService} from "./services/game-form.service";
import {GameManagerService} from "./services/game-manager.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, AfterViewInit{

    public urlChronoImg: string = "../../assets/chrono.png";
    public wordForm: FormGroup;
    private actualWords: Word[] = [{name: ""}];
    public actualWordForm: string = "";
    public time: number = 0;
    public allTimer: any[] = [];
    private isWordValid: boolean = false;
    @ViewChild('word') wordFormToggle!: ElementRef;
    constructor(private gameManagerService:GameManagerService, private configFormResult: ConfigFormResultService, private gameFormService: GameFormService, public wordService:WordsServices, public formBuilder: FormBuilder) {
      this.wordForm = this.formBuilder.group({
            word: [''],
            isValid: this.isWordValid
        });
    }

    ngAfterViewInit(): void {
      this.wordForm.addControl('isValid', this.formBuilder.control((this.isWordValid)))
      this.wordService.words$.subscribe(() => {
        this.actualWords = this.wordService.getActualWords();
        this.wordForm.get('word')?.enable();
        this.wordFormToggle.nativeElement.focus();
        this.resetTimer();
      });
    }
    ngOnInit(){
        this.actualWords = this.wordService.getActualWords();
        this.resetTimer();
    }

    testServiceForm(){
        console.log(this.gameFormService.getResults())
    }

    verifWord(): boolean{
        this.actualWordForm = this.wordForm.get('word')?.value.toLowerCase();
        if(this.actualWordForm.length == 1){
          this.startTimer();
        }
        this.isWordValid = this.actualWords.some(word => word.name == this.actualWordForm);
        this.wordForm.patchValue({'isValid': this.isWordValid.toString()});
        if(this.isWordValid){
          this.onSubmit();
        }
        return this.isWordValid;
    }

    resetTimer(){
      this.time = this.actualWords.reduce((motCourant, motSuivant) => {
        return motSuivant.name.length > motCourant.name.length ? motSuivant: motCourant;
      }, {name: ""}).name.length;
      this.time = this.time * 0.6;    //ratio par caractere
      this.time = Number(this.time.toFixed(1));   //on arrondi au dixieme de secondes
      this.startTimer();
      this.pauseTimer();
    }

    startTimer(){
      const timer = setInterval(() => {
        if (this.time > 0) {
          this.time = Math.max(0, Number((this.time - 0.1).toFixed(1)));
        } else {
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
        this.gameFormService.addResult(this.wordForm.value)
        this.wordForm.reset();
        this.wordForm.get('word')?.disable();
        console.log(this.gameFormService.getResults());
    }
}
