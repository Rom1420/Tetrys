import {Injectable} from '@angular/core';
import {GAMEDETAILS_LIST} from '../mock/game-details.mock';
import {GameDetails} from '../models/game-details.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {httpOptionsBase} from '../../../../configs/server.config';
import {HttpClient} from '@angular/common/http';
import {StudentService} from 'src/app/core/components/services/student.service';
import {backUrl} from "../../../../environnement/environnement";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  private gameDetailsList: GameDetails[] = GAMEDETAILS_LIST;
  public gameDetailsList$: BehaviorSubject<GameDetails[]> = new BehaviorSubject<GameDetails[]>(this.gameDetailsList);
  private gameDetailsUrl = backUrl + '/gameDetails';
  private httpOptions = httpOptionsBase;
  private idJoueur: number | null = 0;



  constructor(private http:HttpClient, private studentService:StudentService){
    this.studentService.selectedStudentId$.subscribe((value) => {
      if(value){
        this.fetchGameDetails(value);
        console.log("value" + value)
        this.idJoueur = value;

      }
    });
  }

  fetchGameDetails(studentId: number):void {
    const requestUrl =`${this.gameDetailsUrl}/students/${studentId}`;
    this.http.get<GameDetails[]>(requestUrl).subscribe(
      gameDetailsList => {
        this.gameDetailsList=this.gameDetailsList;
        this.gameDetailsList$.next(this.gameDetailsList)
      },
      error => console.error("Erreur lors de la récupération des gameResumes", error)
    );
  }

  createGameDetails(precisionPercentage: number, wordsPerMinute: number, correctWordsNumber: number, incorrectWordsNumber: number, accentsPrecisionPercentage: number): Observable<GameDetails> {
    const url = `${this.gameDetailsUrl}/students/${this.idJoueur}`;
    const gameDetails = { precisionPercentage, wordsPerMinute, correctWordsNumber, incorrectWordsNumber, accentsPrecisionPercentage };
    console.log(gameDetails)
    return this.http.post<GameDetails>(url, gameDetails, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du gameDetails', error);
        throw error;
      })
    );
  }



  getAllGameDetails(): Observable<GameDetails[]>{
    const url=`${this.gameDetailsUrl}/`
    return this.http.get<GameDetails[]>(url, this.httpOptions);
  }


  getGameDetails(idJoueur: number, idPartie: number): Observable<GameDetails> {
    const url = `${this.gameDetailsUrl}/students/${idJoueur}/parties/${idPartie}`;
    return this.http.get<GameDetails>(url, this.httpOptions);
  }
}
