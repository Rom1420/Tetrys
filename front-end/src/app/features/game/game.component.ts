import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigFormResultService} from "./services/config-form-result.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WordsServices} from "./services/words.service";
import {Word} from "./models/word.model";
import {GameFormService} from "./services/game-form.service";
import {GameManagerService} from "./services/game-manager.service";
import {ConfigModel} from "./models/config.model";
import {GameEngine} from "./services/game-engine";
import { Subscription } from 'rxjs';
import { GameResumeService } from '../stats-details/services/game-resume.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, AfterViewInit {

    public wordForm: FormGroup;
    private actualWords: Word[] = [{text: "", size: 0, listId: 0, studentId: 0}];
    public actualWordForm: string = "";
    public time: number = 0;
    public allTimer: any[] = [];
    private isWordValid: boolean = false;
    public endGameDisplay: boolean = false;
    @ViewChild('word') wordFormToggle!: ElementRef;
    @ViewChild('textInput') textInput!: ElementRef;
    public config: ConfigModel;
    public show2ndChance = false;
    public errorsAllowed: number = 0;
    private configSubscription!: Subscription;
    score: number = 0;
    errors: number = 0;
    stars: number = 4;

    constructor(
      private gameManagerService: GameManagerService,
      private configFormResult: ConfigFormResultService,
      private gameFormService: GameFormService,
      public wordService: WordsServices,
      public formBuilder: FormBuilder,
      private gameEngine: GameEngine,
      private gameResumeService: GameResumeService 
    ) {
      this.wordForm = this.formBuilder.group({
            word: [''],
            isValid: this.isWordValid,
            error: this.errorsAllowed
        });
      this.config = this.configFormResult.getConfig()
      this.configFormResult.configActual$.subscribe((actualConfig) => {
        this.config = actualConfig
      })
      this.gameEngine.secondError.subscribe((value) => {
        this.show2ndChance = value
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
        if (value) {
          console.log('GameComponent: endGame$ received true.');
          this.createGameResume();
          this.endGameDisplay = value;
        }
      });

    }
    ngOnInit() {
    this.config = this.configFormResult.getConfig();
    this.configSubscription = this.configFormResult.configActual$.subscribe((actualConfig) => {
      this.config = actualConfig;
    });
    this.actualWords = this.wordService.getActualWords();
    this.resetTimer();
    this.startNewGame();
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



    onSubmit() {
      this.pauseTimer();
      if (!this.isWordValid && this.config.errorAllowed) {
        this.errorsAllowed = 1;
        this.wordForm.patchValue({ 'error': this.errorsAllowed });
        this.gameFormService.addResult(this.wordForm.value);
        this.errorsAllowed = 0;
        this.wordForm.reset();
      } else {
        this.wordForm.patchValue({ 'error': this.errorsAllowed });
        this.gameFormService.addResult(this.wordForm.value);
        this.wordForm.get('word')?.disable();
        this.errorsAllowed = 0;
        this.wordForm.reset();
      }
      this.score = this.gameEngine.score;
      this.errors = this.gameEngine.errors;
      this.stars = this.gameEngine.stars;
    }

  startNewGame() {
    this.gameEngine.resetGame();
    this.score = 0;
    this.errors = 0;
    this.stars = 5;
    this.config = this.configFormResult.getConfig();
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

  endGame() {
    this.score = this.gameEngine.score;
    this.errors = this.gameEngine.errors;
    this.stars = this.gameEngine.stars;
    this.createGameResume(); 
    this.gameManagerService.endGame$.next(true);
  }

  replayGame(){
    this.startNewGame();
    this.endGameDisplay = false;
  }

  createGameResume() {
    console.log('GameComponent: createGameResume called.');
    const gameMode = this.config.name || 'debutant';
    const gameScore = this.score;
    const gameStars = this.stars;
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
    const year = String(dateObj.getFullYear()).substring(2);

    const date = `${day}/${month}/${year}`;

    this.gameResumeService.createGameResume(gameMode, gameScore, gameStars, date).subscribe({
      next: (res) => console.log('GameResume saved:', res),
      error: (err) => console.error('Error saving GameResume:', err)
    });
  }
}
