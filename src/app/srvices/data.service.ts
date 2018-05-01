import { Injectable } from '@angular/core';
import { IGame } from '../models/game';
import { ISubmition } from './../models/submition';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class DataService {

  constructor(
    private db: AngularFirestore) {
  }

  getGameDocRef(docId: string): AngularFirestoreDocument<IGame> {
    return this.db.doc<IGame>('games/' + docId);
  }

  getGameSubmitionsCollectionRef(docId: string): AngularFirestoreCollection<ISubmition> {
    return this.getGameDocRef(docId).collection<ISubmition>('submitions');
  }

  getGameUserSubmitionCollectionRef(docId: string, userId: string): AngularFirestoreCollection<ISubmition> {
    return this.getGameDocRef(docId).collection<ISubmition>('submitions', ref => ref.where('userId', '==', userId));
  }

}
