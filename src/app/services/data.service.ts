import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { IGame } from 'models/game';
import { ISubmition } from 'models/submition';
import { IUserScore } from 'models/user-score';


@Injectable()
export class DataService {

  constructor(
    private db: AngularFirestore) {
  }

  getGameDocRef(docId: string): AngularFirestoreDocument<IGame> {
    return this.db.doc<IGame>('games/' + docId);
  }

  addNewGame(game: IGame): string {
    const gameId = this.db.createId();
    this.db.collection('games').doc(gameId).set(game);
    return gameId;
  }

  getGameSubmitionsCollectionRef(docId: string): AngularFirestoreCollection<ISubmition> {
    return this.getGameDocRef(docId).collection<ISubmition>('submitions');
  }

  getGameUserSubmitionCollectionRef(docId: string, userId: string): AngularFirestoreCollection<ISubmition> {
    return this.getGameDocRef(docId).collection<ISubmition>('submitions', ref => ref.where('userId', '==', userId));
  }

  getUserScoreDocRef(userId: string): AngularFirestoreDocument<IUserScore> {
    return this.db.doc<IUserScore>('scores/' + userId);
  }

  getLeaderboard(): Observable<IUserScore[]> {
    return this.db.collection<IUserScore>('scores', ref => ref.orderBy('points')).valueChanges();
  }

  getActiveGamesCollectionRef(): AngularFirestoreCollection<IGame> {
    return this.db.collection<IGame>('games', ref => ref.where('isEnded', '==', false));
  }

}
