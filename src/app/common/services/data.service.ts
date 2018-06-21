import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';
import { IUserScore } from 'models/user-score';
import { Observable, pipe, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from './firebase-database.service';

@Injectable()
export class DataService {

  constructor(
    private db: AngularFirestore,
    private fdService: FirebaseDatabaseService) {
  }

  private historyGamesSubject = new Subject<IGame[]>();

  getUserGamesHistory(userId: string): Observable<IGame[]> {

    this.fdService.getGames().valueChanges().subscribe(games => {
      const result = [];

      games.forEach(game => {
        this.fdService.getGameSubmitions(game.id).valueChanges().subscribe(submitions => {
          const userSubmition = submitions.find(submition => submition.userId === userId);
          if (userSubmition) {
            result.push(game);
          }
        });
      });

      this.historyGamesSubject.next(result);
    });

    return this.historyGamesSubject.asObservable();
  }


  addNewGame(game: IGame): string {
    const gameId = this.db.createId();
    this.fdService.getGame(gameId).set(game);
    return gameId;
  }

  addGameSubmition(gameId: string, submition: ISubmition) {
    this.fdService.getGameSubmitions(gameId).add(submition);
  }

  getGame(gameId: string): Observable<IGame> {
    return this.fdService.getGame(gameId).valueChanges();
  }

  getActiveGames(): Observable<IGame[]> {
    return this.fdService.getGames(ref => ref.where('isEnded', '==', false)).valueChanges();
  }

  getAllGames(): Observable<IGame[]> {
    return this.fdService.getGames().valueChanges();
  }

  getSubmitions(gameId: string): Observable<ISubmition[]> {
    return this.fdService.getGameSubmitions(gameId).valueChanges();
  }

  getUserSubmitions(gameId: string, userId: string): Observable<ISubmition[]> {
    return this.fdService.getGameSubmitions(gameId, ref => ref.where('userId', '==', userId)).valueChanges();
  }

  getUserScore(userId: string): Observable<IUserScore> {
    return this.fdService.getUserScore(userId).valueChanges();
  }

  getLeaderboard(): Observable<IUserScore[]> {
    return this.fdService.getUserScores(ref => ref.orderBy('points', 'desc').limit(5)).valueChanges();
  }
}
