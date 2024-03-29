import {Component, OnInit} from '@angular/core';
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
export class GameComponent implements OnInit{

    public urlChronoImg: string = "../../assets/chrono.png";
    public wordForm: FormGroup;
    private actualWords: Word[] = [{name: ""}];
    public actualWordForm: string = "";
    public time: number = 0;
    public allTimer: any[] = [];
    constructor(private gameManagerService:GameManagerService, private configFormResult: ConfigFormResultService, private gameFormService: GameFormService, public wordService:WordsServices, public formBuilder: FormBuilder) {
          this.wordForm = this.formBuilder.group({
              word: ['']
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
        const verif: boolean = this.actualWords.some(word => word.name == this.actualWordForm);
          if(verif){
            this.onSubmit();
          }
          return verif;
    }

    resetTimer(){
      this.time = this.actualWords.reduce((motCourant, motSuivant) => {
        return motSuivant.name.length > motCourant.name.length ? motSuivant: motCourant;
      }, {name: ""}).name.length;
      this.time = this.time * 0.6;    //ratio par caractere
      this.time = Number(this.time.toFixed(1));   //on arrondi au dixieme de secondes
      console.log(this.time)

      this.startTimer();
      this.pauseTimer();
    }

    startTimer(){
      const timer = setInterval(() => {
        if (this.time > 0) {
          this.time = Math.max(0, Number((this.time - 0.1).toFixed(1)));
        } else {
          this.pauseTimer();
          alert("gros loser");
        }
      }, 100);
      this.allTimer.push(timer);
      console.log("timer " + timer);
    }

    pauseTimer(){
      for(let timerid of this.allTimer){
        clearInterval(timerid);
      }
      this.allTimer = [];
    }



    onSubmit(){
        if (this.wordForm.valid){
          this.pauseTimer()
          this.gameFormService.addResult(this.wordForm.value)
          setTimeout(function (){}, 3000)
          this.gameManagerService.resetWords();
          this.actualWords = this.wordService.getActualWords();
          this.wordForm.reset();
          this.resetTimer();
          console.log(this.gameFormService.getResults());
        }
    }
}
