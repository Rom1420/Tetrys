import { Injectable } from '@angular/core';
import { GameResumeService } from '../../stats-details/services/game-resume.service';
import { GameResume } from '../../stats-details/models/game-resume.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  gameResumes$: Observable<GameResume[]>;

  constructor(private gameResumeService: GameResumeService) {
    this.gameResumes$ = this.gameResumeService.gameResumes$.asObservable();
  }
}