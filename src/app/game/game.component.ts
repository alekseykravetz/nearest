import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuth, User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IGame } from '../models/game';
import { ISubmition } from '../models/submition';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private gameId: string;
  game: IGame;
  submitions$: Observable<ISubmition[]>;
  user: User;
  userSubmition: ISubmition = {
    userDisplayName: null,
    userId: null,
    photoURL: null,
    value: null,
  };

  constructor(
    private router: ActivatedRoute,
    private db: AngularFirestore,
    private authService: AngularFireAuth,
    private location: Location) {

    this.authService.authState.subscribe(state => {
      this.user = state;
      this.userSubmition.userId = state.uid;
      this.userSubmition.userDisplayName = state.displayName;
      this.userSubmition.photoURL = state.photoURL;
      if (this.user) {
        this.getUserSubmitio();
      }
    });
  }

  ngOnInit() {
    this.gameId = this.router.snapshot.params.id;
    if (this.gameId) {
      this.db.doc<IGame>('games/' + this.gameId).valueChanges().subscribe(game => {
        this.game = game;
      });
      this.submitions$ = this.db.collection<ISubmition>('games/' + this.gameId + '/submitions').valueChanges();

      if (this.user) {
        this.getUserSubmitio();
      }
    }
  }

  private getUserSubmitio() {
    this.db.collection<ISubmition>('games/' + this.gameId + '/submitions', ref => ref.where('userId', '==', this.user.uid))
      .valueChanges().subscribe(sub => {
        if (sub[0]) {
          this.userSubmition = sub[0];
        }
      });
  }

  guessSelected(selected: number) {
    this.userSubmition.value = selected;
    this.db.collection('games').doc<IGame>(this.gameId).collection<ISubmition>('submitions').add(this.userSubmition);
  }

  goBack(): void {
    this.location.back();
  }

}
