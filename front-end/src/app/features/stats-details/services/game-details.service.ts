import { Injectable } from '@angular/core';
import { GAMEDETAILS_LIST } from '../mock/game-details.mock';
import { GameDetails }from '../models/game-details.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../../../../configs/server.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudentService } from 'src/app/core/components/services/student.service';
import {backUrl} from "../../../../environnement/environnement";


@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  private gameDetailsList: GameDetails[] = GAMEDETAILS_LIST;
  public gameDetailsList$: BehaviorSubject<GameDetails[]> = new BehaviorSubject<GameDetails[]>(this.gameDetailsList);
  private gameDetailsUrl = backUrl + '/gameDetails';
  private httpOptions = httpOptionsBase;


  constructor(private http:HttpClient, private studentService:StudentService){
    this.studentService.selectedStudentId$.subscribe((value) => {
      if(value){
        this.fetchGameDetails(value);
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
  getAllGameDetails(): Observable<GameDetails[]>{
    const url=`${this.gameDetailsUrl}/`
    const gameDetailsL=this.http.get<GameDetails[]>(url, this.httpOptions);
    return gameDetailsL;
  }


  getGameDetails(idJoueur: number, idPartie: number): Observable<GameDetails> {
    const url = `${this.gameDetailsUrl}/students/${idJoueur}/parties/${idPartie}`;
    const gameResume = this.http.get<GameDetails>(url, this.httpOptions);
    return gameResume;
  }
}
