import { AccountService } from './services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IGame } from './models/game';
import { ISubmition } from './models/submition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'nearest';
  numbers: number[] = [];
  selected: number;
  game$: Observable<IGame>;
  submitions$: Observable<ISubmition[]>;

  constructor(
    private db: AngularFirestore,
    private accountService: AccountService) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.numbers.push(i + 1);
    }
    // this.db.collection('games').doc<IGame>('testGame').set({ secondsLeftUntilNextRaffle: 60 });

    this.submitions$ = this.db.collection('games').doc<IGame>('testGame').collection<ISubmition>('submitions').valueChanges();
  }

  submit() {
    this.db.collection('games').doc<IGame>('testGame').collection<ISubmition>('submitions').add({
      userDisplayName: this.accountService.user.displayName,
      value: this.selected
    } as ISubmition);
  }

}
