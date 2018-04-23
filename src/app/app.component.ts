import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IGame } from './models/game';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'nearest';
  numbers: number[] = [];
  user: User;

  game$: Observable<IGame>;

  private userSub: Subscription;

  constructor(
    private db: AngularFirestore,
    private myAuth: AngularFireAuth) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.numbers.push(i + 1);
    }

    this.userSub = this.myAuth.authState.subscribe(user => {
      this.user = user;
    });

    this.db.collection('games').doc<IGame>('testGame').set({ secondsLeftUntilNextRaffle: 60 });
  
  }

  doLogin() {
    this.myAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
    this.game$ = this.db.collection('games').doc<IGame>('testGame').valueChanges();
    
  }

  doLogout() {
    this.myAuth.auth.signOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
