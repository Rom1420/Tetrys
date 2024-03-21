import {Component} from "@angular/core";
import {Router} from "@angular/router"


@Component({
  selector: 'app-word-game',
  templateUrl: './app.word-game.html',
  styleUrls: ['./app.word-game.scss']
})

export class AppWordGame {

  public words: string[] = ["Hello", "Bonjour", "Salut"];
  public urlBlock: string = "../../assets/block.png";

  constructor(private router: Router) {}

  redirection(){
    this.router.navigate(["/page2"]).then(() => {
      console.log('Navigation réussie !');
    }).catch(error => {
      console.error('Erreur de navigation :', error);
    });
  }
}
