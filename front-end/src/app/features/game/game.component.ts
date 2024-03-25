import { Component } from '@angular/core';
import {ConfigFormResultService} from "./services/config-form-result.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

    public urlChronoImg: string = "../../assets/chrono.png";

    constructor(private configFormResult: ConfigFormResultService) {}

    testServiceForm(){
        console.log(this.configFormResult.getResults())
    }
}
