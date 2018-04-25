import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth, User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IGame } from '../models/game';
import { get1to100array } from '../helpers/one-to-one-hundred.helper';
import { ISubmition } from '../models/submition';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game$: Observable<IGame>;
  submitions$: Observable<ISubmition[]>;
  numbers: number[];
  user: User;
  selected: number;
  submitted = false;

  private gameId: string;

  constructor(
    private router: ActivatedRoute,
    private db: AngularFirestore,
    private authService: AngularFireAuth,
    private location: Location) {

    this.numbers = get1to100array();
    this.authService.authState.subscribe(state => {
      this.user = state;
    });
  }

  ngOnInit() {
    this.gameId = this.router.snapshot.params.id;

    if (this.gameId) {
      this.game$ = this.db.doc<IGame>('games/' + this.gameId).valueChanges();
      this.submitions$ = this.db.collection<ISubmition>('games/' + this.gameId + '/submitions').valueChanges();

    }
  }

  submit() {
    this.db.collection('games').doc<IGame>(this.gameId).collection<ISubmition>('submitions').add({
      userDisplayName: this.user.displayName,
      userId: this.user.uid,
      value: this.selected
    } as ISubmition);
    this.submitted = true;
  }

  goBack(): void {
    this.location.back();
  }

}
