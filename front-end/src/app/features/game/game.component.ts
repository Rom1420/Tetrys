import {Component, OnInit} from '@angular/core';
import {ConfigFormResultService} from "./services/config-form-result.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WordsServices} from "./services/words.services";
import {Word} from "./models/word.model";
import {GameFormService} from "./services/game-form.service";
import {debounce, debounceTime} from "rxjs";
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
    public actualWord: string = "";
    constructor(private gameManagerService:GameManagerService, private configFormResult: ConfigFormResultService, private gameFormService: GameFormService, public wordService:WordsServices, public formBuilder: FormBuilder) {
          this.wordForm = this.formBuilder.group({
              word: ['']
          });
    }
    ngOnInit(){
        this.actualWords = this.wordService.getActualWords();
    }

    testServiceForm(){
        console.log(this.gameFormService.getResults())
    }

    verifWord(): boolean{
        this.actualWord = this.wordForm.get('word')?.value;
        const verif: boolean = this.actualWords.some(word => word.name == this.actualWord);
        if(verif){
          this.onSubmit();
        }
        return verif;
    }

    onSubmit(){
        if (this.wordForm.valid){
          this.gameFormService.addResult(this.wordForm.value)
          this.gameManagerService.resetWords();
          this.actualWords = this.wordService.getActualWords();
          this.wordForm.reset();
          console.log(this.gameFormService.getResults());
        }
    }
}
