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
import { get1to100array } from './helpers/one-to-one-hundred.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  numbers: number[];
  selected: number;
  game$: Observable<IGame>;
  submitions$: Observable<ISubmition[]>;

  constructor(
    private db: AngularFirestore,
    private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.numbers = get1to100array();
    this.game$ = this.db.collection('games').doc<IGame>('testGame').valueChanges();
    this.submitions$ = this.db.collection('games').doc<IGame>('testGame').collection<ISubmition>('submitions').valueChanges();
  }

  submit() {
    this.db.collection('games').doc<IGame>('testGame').collection<ISubmition>('submitions').add({
      userDisplayName: this.accountService.user.displayName,
      value: this.selected
    } as ISubmition);
  }

}
