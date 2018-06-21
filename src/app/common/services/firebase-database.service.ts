import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';
import { IUserScore } from 'models/user-score';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';

@Injectable()
export class FirebaseDatabaseService {

  constructor(
    private db: AngularFirestore) {
  }



  getGames(queryFn?: QueryFn): AngularFirestoreCollection<IGame> {
    return this.db.collection<IGame>('games', queryFn);
  }

  getGame(docId: string): AngularFirestoreDocument<IGame> {
    return this.getGames().doc<IGame>(docId);
  }

  getGameSubmitions(docId: string, queryFn?: QueryFn): AngularFirestoreCollection<ISubmition> {
    return this.getGame(docId).collection<ISubmition>('submitions', queryFn);
  }

  getUserScores(queryFn?: QueryFn): AngularFirestoreCollection<IUserScore> {
    return this.db.collection<IUserScore>('scores', queryFn);
  }

  getUserScore(docId: string): AngularFirestoreDocument<IUserScore> {
    return this.getUserScores().doc(docId);
  }
}
